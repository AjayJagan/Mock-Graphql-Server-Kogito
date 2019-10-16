const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  scalar DateTime

  schema {
    query: Query
    subscription: Subscription
  }

  type ProcessInstance {
    id: String!
    processId: String!
    processName: String
    parentProcessInstanceId: String
    rootProcessInstanceId: String
    rootProcessId: String
    roles: [String!]
    state: ProcessInstanceState!
    endpoint: String
    nodes: [NodeInstance!]!
    variables: String
    start: String
    end: String
  }

  type ProcessInstanceMeta {
    id: String!
    processId: String!
    processName: String
    parentProcessInstanceId: String
    rootProcessInstanceId: String
    rootProcessId: String
    roles: [String!]
    state: ProcessInstanceState!
    endpoint: String!
    start: String
    end: String
  }

  enum ProcessInstanceState {
    PENDING
    ACTIVE
    COMPLETED
    ABORTED
    SUSPENDED
    ERROR
  }

  type NodeInstance {
    id: String!
    name: String!
    type: String!
    enter: String
    exit: String
    definitionId: String!
    nodeId: String!
  }

  type Query {
    ProcessInstances(filter: ProcessInstanceFilter): [ProcessInstance]
    AllProcessInstances: [ProcessInstance]
    UserTaskInstances(filter: UserTaskInstanceFilter): [UserTaskInstance]
  }

  input ProcessInstanceFilter {
    state: [ProcessInstanceState!]
    id: [String!]
    processId: [String!]
    limit: Int
    offset: Int
    parentProcessInstanceId: String
  }

  type UserTaskInstance {
    id: String!
    description: String
    name: String
    priority: String
    processInstanceId: String!
    processId: String!
    rootProcessInstanceId: String
    rootProcessId: String
    state: String!
    actualOwner: String
    adminGroups: [String!]
    adminUsers: [String!]
    completed: DateTime
    started: DateTime!
    excludedUsers: [String!]
    potentialGroups: [String!]
    potentialUsers: [String!]
    inputs: String
    outputs: String
    referenceName: String
  }

  type UserTaskInstanceMeta {
    id: String!
    description: String
    name: String
    priority: String
    processInstanceId: String!
    state: String!
    actualOwner: String
    adminGroups: [String!]
    adminUsers: [String!]
    completed: DateTime
    started: DateTime!
    excludedUsers: [String!]
    potentialGroups: [String!]
    potentialUsers: [String!]
    referenceName: String
  }

  input UserTaskInstanceFilter {
    state: [String!]
    id: [String!]
    processInstanceId: [String!]
    actualOwner: [String!]
    potentialUsers: [String!]
    potentialGroups: [String!]
    limit: Int
    offset: Int
  }

  type Subscription {
    ProcessInstanceAdded: ProcessInstance!
    ProcessInstanceUpdated: ProcessInstance!
    UserTaskInstanceAdded: UserTaskInstance!
    UserTaskInstanceUpdated: UserTaskInstance!
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    AllProcessInstances: () => {
      const data = [
        {
          id: "e1308c27-dab7-4680-b98b-c99e5eb0d70c",
          processId: "hotelBooking",
          parentProcessInstanceId: "3619de44-13be-4225-bd22-725a9a8ccb2a",
          processName: "HotelBooking",
          roles: [],
          state: "COMPLETED",
          variables:
            '{"trip":{"begin":"2019-09-30T22:00:00Z[UTC]","city":"Brisbane","country":"India","end":"2019-10-25T22:00:00Z[UTC]","visaRequired":false},"hotel":{"address":{"city":"Brisbane","country":"India","street":"street","zipCode":"12345"},"bookingNumber":"XX-012345","name":"Perfect hotel","phone":"09876543"},"traveller":{"address":{"city":"Bangalore","country":"India","street":"test","zipCode":"560093"},"email":"ajaganat@redhat.com","firstName":"Ajay","lastName":"Jaganathan","nationality":"Polish"}}',
          nodes: [
            {
              name: "End Event 1",
              definitionId: "EndEvent_1",
              id: "6dac63bc-3fae-466f-b58a-b85af189d9ad",
              enter: "2019-10-16T04:44:32.932Z",
              exit: "2019-10-16T04:44:32.932Z"
            },
            {
              name: "Book hotel",
              definitionId: "ServiceTask_1",
              id: "03125a62-655d-4640-98a2-82b5172f7544",
              enter: "2019-10-16T04:44:32.929Z",
              exit: "2019-10-16T04:44:32.932Z"
            },
            {
              name: "StartProcess",
              definitionId: "StartEvent_1",
              id: "98a41db9-e1b5-4333-a15f-22e6e0a6297f",
              enter: "2019-10-16T04:44:32.928Z",
              exit: "2019-10-16T04:44:32.929Z"
            }
          ]
        },
        {
          id: "d7b911f8-2eaa-4adb-b392-089e2a40ae03",
          processId: "flightBooking",
          parentProcessInstanceId: "3619de44-13be-4225-bd22-725a9a8ccb2a",
          processName: "FlightBooking",
          roles: [],
          state: "COMPLETED",
          variables:
            '{"flight":{"arrival":"2019-10-25T22:00:00Z[UTC]","departure":"2019-09-30T22:00:00Z[UTC]","flightNumber":"MX555"},"trip":{"begin":"2019-09-30T22:00:00Z[UTC]","city":"Brisbane","country":"India","end":"2019-10-25T22:00:00Z[UTC]","visaRequired":false},"traveller":{"address":{"city":"Bangalore","country":"India","street":"test","zipCode":"560093"},"email":"ajaganat@redhat.com","firstName":"Ajay","lastName":"Jaganathan","nationality":"Polish"}}',
          nodes: [
            {
              name: "End Event 1",
              definitionId: "EndEvent_1",
              id: "59fe733c-4eff-4b97-8d80-4e7609a3feaf",
              enter: "2019-10-16T04:44:32.938Z",
              exit: "2019-10-16T04:44:32.938Z"
            },
            {
              name: "Book flight",
              definitionId: "ServiceTask_1",
              id: "28b1ca3d-5134-49c5-be48-8002f65b8dae",
              enter: "2019-10-16T04:44:32.938Z",
              exit: "2019-10-16T04:44:32.938Z"
            },
            {
              name: "StartProcess",
              definitionId: "StartEvent_1",
              id: "efd5216f-bf3a-4a6f-92a6-679cde23948d",
              enter: "2019-10-16T04:44:32.938Z",
              exit: "2019-10-16T04:44:32.938Z"
            }
          ]
        },
        {
          id: "3619de44-13be-4225-bd22-725a9a8ccb2a",
          processId: "travels",
          parentProcessInstanceId: null,
          processName: "travels",
          roles: [],
          state: "COMPLETED",
          variables:
            '{"flight":{"arrival":"2019-10-25T22:00:00Z[UTC]","departure":"2019-09-30T22:00:00Z[UTC]","flightNumber":"MX555"},"trip":{"begin":"2019-09-30T22:00:00Z[UTC]","city":"Brisbane","country":"India","end":"2019-10-25T22:00:00Z[UTC]","visaRequired":false},"hotel":{"address":{"city":"Brisbane","country":"India","street":"street","zipCode":"12345"},"bookingNumber":"XX-012345","name":"Perfect hotel","phone":"09876543"},"traveller":{"address":{"city":"Bangalore","country":"India","street":"test","zipCode":"560093"},"email":"ajaganat@redhat.com","firstName":"Ajay","lastName":"Jaganathan","nationality":"Polish"}}',
          nodes: [
            {
              name: "End Event 1",
              definitionId: "EndEvent_1",
              id: "f6b400d4-2795-4f1c-a0a1-5e931475bd63",
              enter: "2019-10-16T04:56:42.927Z",
              exit: "2019-10-16T04:56:42.927Z"
            },
            {
              name: "Confirm travel",
              definitionId: "UserTask_2",
              id: "2826eed2-8156-455e-a319-a5060a2a792c",
              enter: "2019-10-16T04:44:32.941Z",
              exit: "2019-10-16T04:56:42.927Z"
            },
            {
              name: "Book Hotel",
              definitionId: "CallActivity_1",
              id: "eb6941da-ccb1-450c-b6ac-c06113db44dd",
              enter: "2019-10-16T04:44:32.927Z",
              exit: "2019-10-16T04:44:32.937Z"
            },
            {
              name: "Join",
              definitionId: "ParallelGateway_2",
              id: "902556e9-3914-4dcb-94d3-daef64d1274c",
              enter: "2019-10-16T04:44:32.94Z",
              exit: "2019-10-16T04:44:32.941Z"
            },
            {
              name: "Book Flight",
              definitionId: "CallActivity_2",
              id: "15df98c6-7d20-475f-a74a-460d4f3c52bb",
              enter: "2019-10-16T04:44:32.937Z",
              exit: "2019-10-16T04:44:32.94Z"
            },
            {
              name: "Book",
              definitionId: "ParallelGateway_1",
              id: "b0c975c1-ae37-4fd0-a9e8-0e4516dab5ba",
              enter: "2019-10-16T04:44:32.926Z",
              exit: "2019-10-16T04:44:32.937Z"
            },
            {
              name: "Join",
              definitionId: "ExclusiveGateway_2",
              id: "0bce313d-e674-4c5b-ac53-a43d80ff4b33",
              enter: "2019-10-16T04:44:32.926Z",
              exit: "2019-10-16T04:44:32.926Z"
            },
            {
              name: "is visa required",
              definitionId: "ExclusiveGateway_1",
              id: "a8dce6f6-cd1e-4455-ab56-33ace8f0364a",
              enter: "2019-10-16T04:44:32.925Z",
              exit: "2019-10-16T04:44:32.926Z"
            },
            {
              name: "Visa check",
              definitionId: "BusinessRuleTask_1",
              id: "1f9f3b3c-bd2a-49b3-bd8b-826c7d1913a9",
              enter: "2019-10-16T04:44:32.873Z",
              exit: "2019-10-16T04:44:32.925Z"
            },
            {
              name: "StartProcess",
              definitionId: "StartEvent_1",
              id: "17e3c74c-88e9-4e4d-82b5-2e9d3f38aadb",
              enter: "2019-10-16T04:44:32.871Z",
              exit: "2019-10-16T04:44:32.873Z"
            }
          ]
        },
        {
          id: "f0df27b1-85f9-442b-8720-aa2d6fdb0877",
          processId: "travels",
          parentProcessInstanceId: null,
          processName: "travels",
          roles: [],
          state: "ACTIVE",
          variables:
            '{"flight":{"arrival":"2019-10-30T22:00:00Z[UTC]","departure":"2019-09-30T22:00:00Z[UTC]","flightNumber":"MX555"},"hotel":{"address":{"city":"Bangalore","country":"India","street":"street","zipCode":"12345"},"bookingNumber":"XX-012345","name":"Perfect hotel","phone":"09876543"},"trip":{"begin":"2019-09-30T22:00:00Z[UTC]","city":"Bangalore","country":"India","end":"2019-10-30T22:00:00Z[UTC]","visaRequired":false},"traveller":{"address":{"city":"Bangalore","country":"Poland","street":"Bangalore","zipCode":"560093"},"email":"ajaganat@redhat.com","firstName":"Ajay","lastName":"Jaganathan","nationality":"Polish"}}',
          nodes: [
            {
              name: "Book Flight",
              definitionId: "CallActivity_2",
              id: "fec270e7-afc1-4612-bbdf-43e4d79d1612",
              enter: "2019-10-16T04:57:04.375Z",
              exit: "2019-10-16T04:57:04.378Z"
            },
            {
              name: "Confirm travel",
              definitionId: "UserTask_2",
              id: "ebee96bb-ec8c-4e12-bb04-015ada9684f6",
              enter: "2019-10-16T04:57:04.382Z",
              exit: null
            },
            {
              name: "Join",
              definitionId: "ParallelGateway_2",
              id: "73d98813-4bb9-4b18-b76d-2974f8e1de0c",
              enter: "2019-10-16T04:57:04.381Z",
              exit: "2019-10-16T04:57:04.381Z"
            },
            {
              name: "Book Hotel",
              definitionId: "CallActivity_1",
              id: "04e1c3dc-c37c-4fc0-b253-dea189e62357",
              enter: "2019-10-16T04:57:04.378Z",
              exit: "2019-10-16T04:57:04.381Z"
            },
            {
              name: "Book",
              definitionId: "ParallelGateway_1",
              id: "c6beb2de-107d-47cd-997c-d484aa3aadaa",
              enter: "2019-10-16T04:57:04.375Z",
              exit: "2019-10-16T04:57:04.378Z"
            },
            {
              name: "Join",
              definitionId: "ExclusiveGateway_2",
              id: "a1516462-3e70-45ee-80d4-069ea363dccc",
              enter: "2019-10-16T04:57:04.375Z",
              exit: "2019-10-16T04:57:04.375Z"
            },
            {
              name: "is visa required",
              definitionId: "ExclusiveGateway_1",
              id: "f44296c1-4eca-4195-b9aa-5d7e027e34e4",
              enter: "2019-10-16T04:57:04.375Z",
              exit: "2019-10-16T04:57:04.375Z"
            },
            {
              name: "Visa check",
              definitionId: "BusinessRuleTask_1",
              id: "112504e6-8642-4e54-9aa5-46b9d156bc9a",
              enter: "2019-10-16T04:57:04.367Z",
              exit: "2019-10-16T04:57:04.375Z"
            },
            {
              name: "StartProcess",
              definitionId: "StartEvent_1",
              id: "e1814458-aca4-45b4-bd8a-4c3a71de71b3",
              enter: "2019-10-16T04:57:04.367Z",
              exit: "2019-10-16T04:57:04.367Z"
            }
          ]
        },
        {
          id: "70a4ead8-0597-403c-b361-361100b5614b",
          processId: "flightBooking",
          parentProcessInstanceId: "f0df27b1-85f9-442b-8720-aa2d6fdb0877",
          processName: "FlightBooking",
          roles: [],
          state: "COMPLETED",
          variables:
            '{"flight":{"arrival":"2019-10-30T22:00:00Z[UTC]","departure":"2019-09-30T22:00:00Z[UTC]","flightNumber":"MX555"},"trip":{"begin":"2019-09-30T22:00:00Z[UTC]","city":"Bangalore","country":"India","end":"2019-10-30T22:00:00Z[UTC]","visaRequired":false},"traveller":{"address":{"city":"Bangalore","country":"Poland","street":"Bangalore","zipCode":"560093"},"email":"ajaganat@redhat.com","firstName":"Ajay","lastName":"Jaganathan","nationality":"Polish"}}',
          nodes: [
            {
              name: "End Event 1",
              definitionId: "EndEvent_1",
              id: "354b5354-a6bf-44e2-9395-9c628523cac8",
              enter: "2019-10-16T04:57:04.376Z",
              exit: "2019-10-16T04:57:04.376Z"
            },
            {
              name: "Book flight",
              definitionId: "ServiceTask_1",
              id: "a6e1b4c8-85b6-4ace-acab-6ab21be8ad0d",
              enter: "2019-10-16T04:57:04.376Z",
              exit: "2019-10-16T04:57:04.376Z"
            },
            {
              name: "StartProcess",
              definitionId: "StartEvent_1",
              id: "718da164-24e6-426a-a8be-ad3b60a8b658",
              enter: "2019-10-16T04:57:04.376Z",
              exit: "2019-10-16T04:57:04.376Z"
            }
          ]
        },
        {
          id: "9020cf58-8f7b-4d91-ba6c-17513beed764",
          processId: "hotelBooking",
          parentProcessInstanceId: "f0df27b1-85f9-442b-8720-aa2d6fdb0877",
          processName: "HotelBooking",
          roles: [],
          state: "COMPLETED",
          variables:
            '{"trip":{"begin":"2019-09-30T22:00:00Z[UTC]","city":"Bangalore","country":"India","end":"2019-10-30T22:00:00Z[UTC]","visaRequired":false},"hotel":{"address":{"city":"Bangalore","country":"India","street":"street","zipCode":"12345"},"bookingNumber":"XX-012345","name":"Perfect hotel","phone":"09876543"},"traveller":{"address":{"city":"Bangalore","country":"Poland","street":"Bangalore","zipCode":"560093"},"email":"ajaganat@redhat.com","firstName":"Ajay","lastName":"Jaganathan","nationality":"Polish"}}',
          nodes: [
            {
              name: "End Event 1",
              definitionId: "EndEvent_1",
              id: "6846df98-3484-4f02-a48d-a5e599fa5532",
              enter: "2019-10-16T04:57:04.38Z",
              exit: "2019-10-16T04:57:04.38Z"
            },
            {
              name: "Book hotel",
              definitionId: "ServiceTask_1",
              id: "93083686-38c8-4e77-b05a-d00e6a196a1d",
              enter: "2019-10-16T04:57:04.379Z",
              exit: "2019-10-16T04:57:04.38Z"
            },
            {
              name: "StartProcess",
              definitionId: "StartEvent_1",
              id: "dd64920c-71ef-4070-b0fb-a861846a1d0e",
              enter: "2019-10-16T04:57:04.379Z",
              exit: "2019-10-16T04:57:04.379Z"
            }
          ]
        }
      ];
      return data;
    },
    ProcessInstances: (parent, args, context, info) => {
      const data = [
        {
          id: "e1308c27-dab7-4680-b98b-c99e5eb0d70c",
          processId: "hotelBooking",
          parentProcessInstanceId: "3619de44-13be-4225-bd22-725a9a8ccb2a",
          processName: "HotelBooking",
          roles: [],
          state: "COMPLETED",
          variables:
            '{"trip":{"begin":"2019-09-30T22:00:00Z[UTC]","city":"Brisbane","country":"India","end":"2019-10-25T22:00:00Z[UTC]","visaRequired":false},"hotel":{"address":{"city":"Brisbane","country":"India","street":"street","zipCode":"12345"},"bookingNumber":"XX-012345","name":"Perfect hotel","phone":"09876543"},"traveller":{"address":{"city":"Bangalore","country":"India","street":"test","zipCode":"560093"},"email":"ajaganat@redhat.com","firstName":"Ajay","lastName":"Jaganathan","nationality":"Polish"}}',
          nodes: [
            {
              name: "End Event 1",
              definitionId: "EndEvent_1",
              id: "6dac63bc-3fae-466f-b58a-b85af189d9ad",
              enter: "2019-10-16T04:44:32.932Z",
              exit: "2019-10-16T04:44:32.932Z"
            },
            {
              name: "Book hotel",
              definitionId: "ServiceTask_1",
              id: "03125a62-655d-4640-98a2-82b5172f7544",
              enter: "2019-10-16T04:44:32.929Z",
              exit: "2019-10-16T04:44:32.932Z"
            },
            {
              name: "StartProcess",
              definitionId: "StartEvent_1",
              id: "98a41db9-e1b5-4333-a15f-22e6e0a6297f",
              enter: "2019-10-16T04:44:32.928Z",
              exit: "2019-10-16T04:44:32.929Z"
            }
          ]
        },
        {
          id: "d7b911f8-2eaa-4adb-b392-089e2a40ae03",
          processId: "flightBooking",
          parentProcessInstanceId: "3619de44-13be-4225-bd22-725a9a8ccb2a",
          processName: "FlightBooking",
          roles: [],
          state: "COMPLETED",
          variables:
            '{"flight":{"arrival":"2019-10-25T22:00:00Z[UTC]","departure":"2019-09-30T22:00:00Z[UTC]","flightNumber":"MX555"},"trip":{"begin":"2019-09-30T22:00:00Z[UTC]","city":"Brisbane","country":"India","end":"2019-10-25T22:00:00Z[UTC]","visaRequired":false},"traveller":{"address":{"city":"Bangalore","country":"India","street":"test","zipCode":"560093"},"email":"ajaganat@redhat.com","firstName":"Ajay","lastName":"Jaganathan","nationality":"Polish"}}',
          nodes: [
            {
              name: "End Event 1",
              definitionId: "EndEvent_1",
              id: "59fe733c-4eff-4b97-8d80-4e7609a3feaf",
              enter: "2019-10-16T04:44:32.938Z",
              exit: "2019-10-16T04:44:32.938Z"
            },
            {
              name: "Book flight",
              definitionId: "ServiceTask_1",
              id: "28b1ca3d-5134-49c5-be48-8002f65b8dae",
              enter: "2019-10-16T04:44:32.938Z",
              exit: "2019-10-16T04:44:32.938Z"
            },
            {
              name: "StartProcess",
              definitionId: "StartEvent_1",
              id: "efd5216f-bf3a-4a6f-92a6-679cde23948d",
              enter: "2019-10-16T04:44:32.938Z",
              exit: "2019-10-16T04:44:32.938Z"
            }
          ]
        },
        {
          id: "3619de44-13be-4225-bd22-725a9a8ccb2a",
          processId: "travels",
          parentProcessInstanceId: null,
          processName: "travels",
          roles: [],
          state: "COMPLETED",
          variables:
            '{"flight":{"arrival":"2019-10-25T22:00:00Z[UTC]","departure":"2019-09-30T22:00:00Z[UTC]","flightNumber":"MX555"},"trip":{"begin":"2019-09-30T22:00:00Z[UTC]","city":"Brisbane","country":"India","end":"2019-10-25T22:00:00Z[UTC]","visaRequired":false},"hotel":{"address":{"city":"Brisbane","country":"India","street":"street","zipCode":"12345"},"bookingNumber":"XX-012345","name":"Perfect hotel","phone":"09876543"},"traveller":{"address":{"city":"Bangalore","country":"India","street":"test","zipCode":"560093"},"email":"ajaganat@redhat.com","firstName":"Ajay","lastName":"Jaganathan","nationality":"Polish"}}',
          nodes: [
            {
              name: "End Event 1",
              definitionId: "EndEvent_1",
              id: "f6b400d4-2795-4f1c-a0a1-5e931475bd63",
              enter: "2019-10-16T04:56:42.927Z",
              exit: "2019-10-16T04:56:42.927Z"
            },
            {
              name: "Confirm travel",
              definitionId: "UserTask_2",
              id: "2826eed2-8156-455e-a319-a5060a2a792c",
              enter: "2019-10-16T04:44:32.941Z",
              exit: "2019-10-16T04:56:42.927Z"
            },
            {
              name: "Book Hotel",
              definitionId: "CallActivity_1",
              id: "eb6941da-ccb1-450c-b6ac-c06113db44dd",
              enter: "2019-10-16T04:44:32.927Z",
              exit: "2019-10-16T04:44:32.937Z"
            },
            {
              name: "Join",
              definitionId: "ParallelGateway_2",
              id: "902556e9-3914-4dcb-94d3-daef64d1274c",
              enter: "2019-10-16T04:44:32.94Z",
              exit: "2019-10-16T04:44:32.941Z"
            },
            {
              name: "Book Flight",
              definitionId: "CallActivity_2",
              id: "15df98c6-7d20-475f-a74a-460d4f3c52bb",
              enter: "2019-10-16T04:44:32.937Z",
              exit: "2019-10-16T04:44:32.94Z"
            },
            {
              name: "Book",
              definitionId: "ParallelGateway_1",
              id: "b0c975c1-ae37-4fd0-a9e8-0e4516dab5ba",
              enter: "2019-10-16T04:44:32.926Z",
              exit: "2019-10-16T04:44:32.937Z"
            },
            {
              name: "Join",
              definitionId: "ExclusiveGateway_2",
              id: "0bce313d-e674-4c5b-ac53-a43d80ff4b33",
              enter: "2019-10-16T04:44:32.926Z",
              exit: "2019-10-16T04:44:32.926Z"
            },
            {
              name: "is visa required",
              definitionId: "ExclusiveGateway_1",
              id: "a8dce6f6-cd1e-4455-ab56-33ace8f0364a",
              enter: "2019-10-16T04:44:32.925Z",
              exit: "2019-10-16T04:44:32.926Z"
            },
            {
              name: "Visa check",
              definitionId: "BusinessRuleTask_1",
              id: "1f9f3b3c-bd2a-49b3-bd8b-826c7d1913a9",
              enter: "2019-10-16T04:44:32.873Z",
              exit: "2019-10-16T04:44:32.925Z"
            },
            {
              name: "StartProcess",
              definitionId: "StartEvent_1",
              id: "17e3c74c-88e9-4e4d-82b5-2e9d3f38aadb",
              enter: "2019-10-16T04:44:32.871Z",
              exit: "2019-10-16T04:44:32.873Z"
            }
          ]
        },
        {
          id: "f0df27b1-85f9-442b-8720-aa2d6fdb0877",
          processId: "travels",
          parentProcessInstanceId: null,
          processName: "travels",
          roles: [],
          state: "ACTIVE",
          variables:
            '{"flight":{"arrival":"2019-10-30T22:00:00Z[UTC]","departure":"2019-09-30T22:00:00Z[UTC]","flightNumber":"MX555"},"hotel":{"address":{"city":"Bangalore","country":"India","street":"street","zipCode":"12345"},"bookingNumber":"XX-012345","name":"Perfect hotel","phone":"09876543"},"trip":{"begin":"2019-09-30T22:00:00Z[UTC]","city":"Bangalore","country":"India","end":"2019-10-30T22:00:00Z[UTC]","visaRequired":false},"traveller":{"address":{"city":"Bangalore","country":"Poland","street":"Bangalore","zipCode":"560093"},"email":"ajaganat@redhat.com","firstName":"Ajay","lastName":"Jaganathan","nationality":"Polish"}}',
          nodes: [
            {
              name: "Book Flight",
              definitionId: "CallActivity_2",
              id: "fec270e7-afc1-4612-bbdf-43e4d79d1612",
              enter: "2019-10-16T04:57:04.375Z",
              exit: "2019-10-16T04:57:04.378Z"
            },
            {
              name: "Confirm travel",
              definitionId: "UserTask_2",
              id: "ebee96bb-ec8c-4e12-bb04-015ada9684f6",
              enter: "2019-10-16T04:57:04.382Z",
              exit: null
            },
            {
              name: "Join",
              definitionId: "ParallelGateway_2",
              id: "73d98813-4bb9-4b18-b76d-2974f8e1de0c",
              enter: "2019-10-16T04:57:04.381Z",
              exit: "2019-10-16T04:57:04.381Z"
            },
            {
              name: "Book Hotel",
              definitionId: "CallActivity_1",
              id: "04e1c3dc-c37c-4fc0-b253-dea189e62357",
              enter: "2019-10-16T04:57:04.378Z",
              exit: "2019-10-16T04:57:04.381Z"
            },
            {
              name: "Book",
              definitionId: "ParallelGateway_1",
              id: "c6beb2de-107d-47cd-997c-d484aa3aadaa",
              enter: "2019-10-16T04:57:04.375Z",
              exit: "2019-10-16T04:57:04.378Z"
            },
            {
              name: "Join",
              definitionId: "ExclusiveGateway_2",
              id: "a1516462-3e70-45ee-80d4-069ea363dccc",
              enter: "2019-10-16T04:57:04.375Z",
              exit: "2019-10-16T04:57:04.375Z"
            },
            {
              name: "is visa required",
              definitionId: "ExclusiveGateway_1",
              id: "f44296c1-4eca-4195-b9aa-5d7e027e34e4",
              enter: "2019-10-16T04:57:04.375Z",
              exit: "2019-10-16T04:57:04.375Z"
            },
            {
              name: "Visa check",
              definitionId: "BusinessRuleTask_1",
              id: "112504e6-8642-4e54-9aa5-46b9d156bc9a",
              enter: "2019-10-16T04:57:04.367Z",
              exit: "2019-10-16T04:57:04.375Z"
            },
            {
              name: "StartProcess",
              definitionId: "StartEvent_1",
              id: "e1814458-aca4-45b4-bd8a-4c3a71de71b3",
              enter: "2019-10-16T04:57:04.367Z",
              exit: "2019-10-16T04:57:04.367Z"
            }
          ]
        },
        {
          id: "70a4ead8-0597-403c-b361-361100b5614b",
          processId: "flightBooking",
          parentProcessInstanceId: "f0df27b1-85f9-442b-8720-aa2d6fdb0877",
          processName: "FlightBooking",
          roles: [],
          state: "COMPLETED",
          variables:
            '{"flight":{"arrival":"2019-10-30T22:00:00Z[UTC]","departure":"2019-09-30T22:00:00Z[UTC]","flightNumber":"MX555"},"trip":{"begin":"2019-09-30T22:00:00Z[UTC]","city":"Bangalore","country":"India","end":"2019-10-30T22:00:00Z[UTC]","visaRequired":false},"traveller":{"address":{"city":"Bangalore","country":"Poland","street":"Bangalore","zipCode":"560093"},"email":"ajaganat@redhat.com","firstName":"Ajay","lastName":"Jaganathan","nationality":"Polish"}}',
          nodes: [
            {
              name: "End Event 1",
              definitionId: "EndEvent_1",
              id: "354b5354-a6bf-44e2-9395-9c628523cac8",
              enter: "2019-10-16T04:57:04.376Z",
              exit: "2019-10-16T04:57:04.376Z"
            },
            {
              name: "Book flight",
              definitionId: "ServiceTask_1",
              id: "a6e1b4c8-85b6-4ace-acab-6ab21be8ad0d",
              enter: "2019-10-16T04:57:04.376Z",
              exit: "2019-10-16T04:57:04.376Z"
            },
            {
              name: "StartProcess",
              definitionId: "StartEvent_1",
              id: "718da164-24e6-426a-a8be-ad3b60a8b658",
              enter: "2019-10-16T04:57:04.376Z",
              exit: "2019-10-16T04:57:04.376Z"
            }
          ]
        },
        {
          id: "9020cf58-8f7b-4d91-ba6c-17513beed764",
          processId: "hotelBooking",
          parentProcessInstanceId: "f0df27b1-85f9-442b-8720-aa2d6fdb0877",
          processName: "HotelBooking",
          roles: [],
          state: "COMPLETED",
          variables:
            '{"trip":{"begin":"2019-09-30T22:00:00Z[UTC]","city":"Bangalore","country":"India","end":"2019-10-30T22:00:00Z[UTC]","visaRequired":false},"hotel":{"address":{"city":"Bangalore","country":"India","street":"street","zipCode":"12345"},"bookingNumber":"XX-012345","name":"Perfect hotel","phone":"09876543"},"traveller":{"address":{"city":"Bangalore","country":"Poland","street":"Bangalore","zipCode":"560093"},"email":"ajaganat@redhat.com","firstName":"Ajay","lastName":"Jaganathan","nationality":"Polish"}}',
          nodes: [
            {
              name: "End Event 1",
              definitionId: "EndEvent_1",
              id: "6846df98-3484-4f02-a48d-a5e599fa5532",
              enter: "2019-10-16T04:57:04.38Z",
              exit: "2019-10-16T04:57:04.38Z"
            },
            {
              name: "Book hotel",
              definitionId: "ServiceTask_1",
              id: "93083686-38c8-4e77-b05a-d00e6a196a1d",
              enter: "2019-10-16T04:57:04.379Z",
              exit: "2019-10-16T04:57:04.38Z"
            },
            {
              name: "StartProcess",
              definitionId: "StartEvent_1",
              id: "dd64920c-71ef-4070-b0fb-a861846a1d0e",
              enter: "2019-10-16T04:57:04.379Z",
              exit: "2019-10-16T04:57:04.379Z"
            }
          ]
        }
      ];
      const result = data.filter(
        datum =>
          datum.parentProcessInstanceId ==
          args["filter"].parentProcessInstanceId
      );
      console.log(args["filter"].parentProcessInstanceId);
      return result;
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
