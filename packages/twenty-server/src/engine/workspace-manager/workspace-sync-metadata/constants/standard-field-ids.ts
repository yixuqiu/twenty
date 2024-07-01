/**
 * /!\ DO NOT EDIT THE IDS OF THIS FILE /!\
 * This file contains static ids for standard objects.
 * These ids are used to identify standard objects in the database and compare them even when renamed.
 * For readability keys can be edited but the values should not be changed.
 */

export const ACTIVITY_TARGET_STANDARD_FIELD_IDS = {
  activity: '20202020-ca58-478c-a4f5-ae825671c30e',
  person: '20202020-4afd-4ae7-99c2-de57d795a93f',
  company: '20202020-7cc0-44a1-8068-f11171fdd02e',
  opportunity: '20202020-1fc2-4af1-8c91-7901ee0fd38b',
  custom: '20202020-7f21-442f-94be-32462281b1ca',
};

export const ACTIVITY_STANDARD_FIELD_IDS = {
  title: '20202020-24a1-4d94-a071-617f3eeed7b0',
  body: '20202020-209b-440a-b2a8-043fa36a7d37',
  type: '20202020-0f2b-4aab-8827-ee5d3f07d993',
  reminderAt: '20202020-eb06-43e2-ba06-336be0e665a3',
  dueAt: '20202020-0336-4511-ba79-565b12801bd9',
  completedAt: '20202020-0f4d-4fca-9f2f-6309d9ecb85f',
  activityTargets: '20202020-7253-42cb-8586-8cf950e70b79',
  attachments: '20202020-5547-4197-bc2e-a07dfc4559ca',
  comments: '20202020-6b2e-4d29-bbd1-ecddb330e71a',
  author: '20202020-455f-44f2-8e89-1b0ef01cb7fb',
  assignee: '20202020-4259-48e4-9e77-6b92991906d5',
};

export const API_KEY_STANDARD_FIELD_IDS = {
  name: '20202020-72e6-4079-815b-436ce8a62f23',
  expiresAt: '20202020-659b-4241-af59-66515b8e7d40',
  revokedAt: '20202020-06ab-44b5-8faf-f6e407685001',
};

export const ATTACHMENT_STANDARD_FIELD_IDS = {
  name: '20202020-87a5-48f8-bbf7-ade388825a57',
  fullPath: '20202020-0d19-453d-8e8d-fbcda8ca3747',
  type: '20202020-a417-49b8-a40b-f6a7874caa0d',
  author: '20202020-6501-4ac5-a4ef-b2f8522ef6cd',
  activity: '20202020-b569-481b-a13f-9b94e47e54fe',
  person: '20202020-0158-4aa2-965c-5cdafe21ffa2',
  company: '20202020-ceab-4a28-b546-73b06b4c08d5',
  opportunity: '20202020-7374-499d-bea3-9354890755b5',
  custom: '20202020-302d-43b3-9aea-aa4f89282a9f',
};

export const BASE_OBJECT_STANDARD_FIELD_IDS = {
  id: '20202020-eda0-4cee-9577-3eb357e3c22b',
  createdAt: '20202020-66ac-4502-9975-e4d959c50311',
  updatedAt: '20202020-d767-4622-bdcf-d8a084834d86',
};

export const BLOCKLIST_STANDARD_FIELD_IDS = {
  handle: '20202020-eef3-44ed-aa32-4641d7fd4a3e',
  workspaceMember: '20202020-548d-4084-a947-fa20a39f7c06',
};

export const CALENDAR_CHANNEL_EVENT_ASSOCIATION_STANDARD_FIELD_IDS = {
  calendarChannel: '20202020-93ee-4da4-8d58-0282c4a9cb7d',
  calendarEvent: '20202020-5aa5-437e-bb86-f42d457783e3',
  eventExternalId: '20202020-9ec8-48bb-b279-21d0734a75a1',
};

export const CALENDAR_CHANNEL_STANDARD_FIELD_IDS = {
  connectedAccount: '20202020-95b1-4f44-82dc-61b042ae2414',
  handle: '20202020-1d08-420a-9aa7-22e0f298232d',
  visibility: '20202020-1b07-4796-9f01-d626bab7ca4d',
  isContactAutoCreationEnabled: '20202020-50fb-404b-ba28-369911a3793a',
  contactAutoCreationPolicy: '20202020-b55d-447d-b4df-226319058775',
  isSyncEnabled: '20202020-fe19-4818-8854-21f7b1b43395',
  syncCursor: '20202020-bac2-4852-a5cb-7a7898992b70',
  calendarChannelEventAssociations: '20202020-afb0-4a9f-979f-2d5087d71d09',
  throttleFailureCount: '20202020-525c-4b76-b9bd-0dd57fd11d61',
  syncStatus: '20202020-7116-41da-8b4b-035975c4eb6a',
  syncStage: '20202020-6246-42e6-b5cd-003bd921782c',
  syncStageStartedAt: '20202020-a934-46f1-a8e7-9568b1e3a53e',
};

export const CALENDAR_EVENT_PARTICIPANT_STANDARD_FIELD_IDS = {
  calendarEvent: '20202020-fe3a-401c-b889-af4f4657a861',
  handle: '20202020-8692-4580-8210-9e09cbd031a7',
  displayName: '20202020-ee1e-4f9f-8ac1-5c0b2f69691e',
  isOrganizer: '20202020-66e7-4e00-9e06-d06c92650580',
  responseStatus: '20202020-cec0-4be8-8fba-c366abc23147',
  person: '20202020-5761-4842-8186-e1898ef93966',
  workspaceMember: '20202020-20e4-4591-93ed-aeb17a4dcbd2',
};

export const CALENDAR_EVENT_STANDARD_FIELD_IDS = {
  title: '20202020-080e-49d1-b21d-9702a7e2525c',
  isCanceled: '20202020-335b-4e04-b470-43b84b64863c',
  isFullDay: '20202020-551c-402c-bb6d-dfe9efe86bcb',
  startsAt: '20202020-2c57-4c75-93c5-2ac950a6ed67',
  endsAt: '20202020-2554-4ee1-a617-17907f6bab21',
  externalCreatedAt: '20202020-9f03-4058-a898-346c62181599',
  externalUpdatedAt: '20202020-b355-4c18-8825-ef42c8a5a755',
  description: '20202020-52c4-4266-a98f-e90af0b4d271',
  location: '20202020-641a-4ffe-960d-c3c186d95b17',
  iCalUID: '20202020-f24b-45f4-b6a3-d2f9fcb98714',
  conferenceSolution: '20202020-1c3f-4b5a-b526-5411a82179eb',
  conferenceLink: '20202020-35da-43ef-9ca0-e936e9dc237b',
  recurringEventExternalId: '20202020-4b96-43d0-8156-4c7a9717635c',
  calendarChannelEventAssociations: '20202020-bdf8-4572-a2cc-ecbb6bcc3a02',
  calendarEventParticipants: '20202020-e07e-4ccb-88f5-6f3d00458eec',
};

export const COMMENT_STANDARD_FIELD_IDS = {
  body: '20202020-d5eb-49d2-b3e0-1ed04145ebb7',
  author: '20202020-2ab1-427e-a981-cf089de3a9bd',
  activity: '20202020-c8d9-4c30-a35e-dc7f44388070',
};

export const COMPANY_STANDARD_FIELD_IDS = {
  name: '20202020-4d99-4e2e-a84c-4a27837b1ece',
  domainName: '20202020-0c28-43d8-8ba5-3659924d3489',
  address: '20202020-a82a-4ee2-96cc-a18a3259d953',
  employees: '20202020-8965-464a-8a75-74bafc152a0b',
  linkedinLink: '20202020-ebeb-4beb-b9ad-6848036fb451',
  xLink: '20202020-6f64-4fd9-9580-9c1991c7d8c3',
  annualRecurringRevenue: '20202020-602a-495c-9776-f5d5b11d227b',
  idealCustomerProfile: '20202020-ba6b-438a-8213-2c5ba28d76a2',
  position: '20202020-9b4e-462b-991d-a0ee33326454',
  people: '20202020-3213-4ddf-9494-6422bcff8d7c',
  accountOwner: '20202020-95b8-4e10-9881-edb5d4765f9d',
  activityTargets: '20202020-c2a5-4c9b-9d9a-582bcd57fbc8',
  opportunities: '20202020-add3-4658-8e23-d70dccb6d0ec',
  favorites: '20202020-4d1d-41ac-b13b-621631298d55',
  attachments: '20202020-c1b5-4120-b0f0-987ca401ed53',
  timelineActivities: '20202020-0414-4daf-9c0d-64fe7b27f89f',
};

export const CONNECTED_ACCOUNT_STANDARD_FIELD_IDS = {
  handle: '20202020-c804-4a50-bb05-b3a9e24f1dec',
  provider: '20202020-ebb0-4516-befc-a9e95935efd5',
  accessToken: '20202020-707b-4a0a-8753-2ad42efe1e29',
  refreshToken: '20202020-532d-48bd-80a5-c4be6e7f6e49',
  accountOwner: '20202020-3517-4896-afac-b1d0aa362af6',
  lastSyncHistoryId: '20202020-115c-4a87-b50f-ac4367a971b9',
  authFailedAt: '20202020-d268-4c6b-baff-400d402b430a',
  messageChannels: '20202020-24f7-4362-8468-042204d1e445',
  calendarChannels: '20202020-af4a-47bb-99ec-51911c1d3977',
  emailAliases: '20202020-8a3d-46be-814f-6228af16c47b',
};

export const EVENT_STANDARD_FIELD_IDS = {
  properties: '20202020-f142-4b04-b91b-6a2b4af3bf10',
  workspaceMember: '20202020-af23-4479-9a30-868edc474b35',
  person: '20202020-c414-45b9-a60a-ac27aa96229e',
  company: '20202020-04ad-4221-a744-7a8278a5ce20',
  opportunity: '20202020-7664-4a35-a3df-580d389fd5f0',
  custom: '20202020-4a71-41b0-9f83-9cdcca3f8b14',
};

export const AUDIT_LOGS_STANDARD_FIELD_IDS = {
  name: '20202020-2462-4b9d-b5d9-745febb3b095',
  properties: '20202020-5d36-470e-8fad-d56ea3ab2fd0',
  context: '20202020-b9d1-4058-9a75-7469cab5ca8c',
  objectName: '20202020-76ba-4c47-b7e5-96034005d00a',
  recordId: '20202020-c578-4acf-bf94-eb53b035cea2',
  workspaceMember: '20202020-6e96-4300-b3f5-67a707147385',
};

export const BEHAVIORAL_EVENT_STANDARD_FIELD_IDS = {
  name: '20202020-2462-4b9d-b5d9-745febb3b095',
  properties: '20202020-5d36-470e-8fad-d56ea3ab2fd0',
  context: '20202020-bd62-4b5b-8385-6caeed8f8078',
  objectName: '20202020-a744-406c-a2e1-9d83d74f4341',
  recordId: '20202020-6d8b-4ca5-9869-f882cb335673',
};

export const TIMELINE_ACTIVITY_STANDARD_FIELD_IDS = {
  happensAt: '20202020-9526-4993-b339-c4318c4d39f0',
  type: '20202020-5e7b-4ccd-8b8a-86b94b474134',
  name: '20202020-7207-46e8-9dab-849505ae8497',
  properties: '20202020-f142-4b04-b91b-6a2b4af3bf11',
  workspaceMember: '20202020-af23-4479-9a30-868edc474b36',
  person: '20202020-c414-45b9-a60a-ac27aa96229f',
  company: '20202020-04ad-4221-a744-7a8278a5ce21',
  opportunity: '20202020-7664-4a35-a3df-580d389fd527',
  custom: '20202020-4a71-41b0-9f83-9cdcca3f8b14',
  linkedRecordCachedName: '20202020-cfdb-4bef-bbce-a29f41230934',
  linkedRecordId: '20202020-2e0e-48c0-b445-ee6c1e61687d',
  linkedObjectMetadataId: '20202020-c595-449d-9f89-562758c9ee69',
};

export const FAVORITE_STANDARD_FIELD_IDS = {
  position: '20202020-dd26-42c6-8c3c-2a7598c204f6',
  workspaceMember: '20202020-ce63-49cb-9676-fdc0c45892cd',
  person: '20202020-c428-4f40-b6f3-86091511c41c',
  company: '20202020-cff5-4682-8bf9-069169e08279',
  opportunity: '20202020-dabc-48e1-8318-2781a2b32aa2',
  custom: '20202020-855a-4bc8-9861-79deef37011f',
};

export const MESSAGE_CHANNEL_MESSAGE_ASSOCIATION_STANDARD_FIELD_IDS = {
  messageChannel: '20202020-b658-408f-bd46-3bd2d15d7e52',
  message: '20202020-da5d-4ac5-8743-342ab0a0336b',
  messageExternalId: '20202020-37d6-438f-b6fd-6503596c8f34',
  messageThread: '20202020-fac8-42a8-94dd-44dbc920ae16',
  messageThreadExternalId: '20202020-35fb-421e-afa0-0b8e8f7f9018',
};

export const MESSAGE_CHANNEL_STANDARD_FIELD_IDS = {
  visibility: '20202020-6a6b-4532-9767-cbc61b469453',
  handle: '20202020-2c96-43c3-93e3-ed6b1acb69bc',
  connectedAccount: '20202020-49a2-44a4-b470-282c0440d15d',
  type: '20202020-ae95-42d9-a3f1-797a2ea22122',
  isContactAutoCreationEnabled: '20202020-fabd-4f14-b7c6-3310f6d132c6',
  contactAutoCreationPolicy: '20202020-fc0e-4ba6-b259-a66ca89cfa38',
  excludeNonProfessionalEmails: '20202020-1df5-445d-b4f3-2413ad178431',
  excludeGroupEmails: '20202020-45a0-4be4-9164-5820a6a109fb',
  messageChannelMessageAssociations: '20202020-49b8-4766-88fd-75f1e21b3d5f',
  isSyncEnabled: '20202020-d9a6-48e9-990b-b97fdf22e8dd',
  syncCursor: '20202020-79d1-41cf-b738-bcf5ed61e256',
  syncedAt: '20202020-263d-4c6b-ad51-137ada56f7d4',
  syncStatus: '20202020-56a1-4f7e-9880-a8493bb899cc',
  syncStage: '20202020-7979-4b08-89fe-99cb5e698767',
  syncStageStartedAt: '20202020-8c61-4a42-ae63-73c1c3c52e06',
  throttleFailureCount: '20202020-0291-42be-9ad0-d578a51684ab',
};

export const MESSAGE_PARTICIPANT_STANDARD_FIELD_IDS = {
  message: '20202020-985b-429a-9db9-9e55f4898a2a',
  role: '20202020-65d1-42f4-8729-c9ec1f52aecd',
  handle: '20202020-2456-464e-b422-b965a4db4a0b',
  displayName: '20202020-36dd-4a4f-ac02-228425be9fac',
  person: '20202020-249d-4e0f-82cd-1b9df5cd3da2',
  workspaceMember: '20202020-77a7-4845-99ed-1bcbb478be6f',
};

export const MESSAGE_THREAD_STANDARD_FIELD_IDS = {
  messages: '20202020-3115-404f-aade-e1154b28e35a',
  messageChannelMessageAssociations: '20202020-314e-40a4-906d-a5d5d6c285f6',
};

export const MESSAGE_STANDARD_FIELD_IDS = {
  headerMessageId: '20202020-72b5-416d-aed8-b55609067d01',
  messageThread: '20202020-30f2-4ccd-9f5c-e41bb9d26214',
  direction: '20202020-0203-4118-8e2a-05b9bdae6dab',
  subject: '20202020-52d1-4036-b9ae-84bd722bb37a',
  text: '20202020-d2ee-4e7e-89de-9a0a9044a143',
  receivedAt: '20202020-140a-4a2a-9f86-f13b6a979afc',
  messageParticipants: '20202020-7cff-4a74-b63c-73228448cbd9',
  messageChannelMessageAssociations: '20202020-3cef-43a3-82c6-50e7cfbc9ae4',
};

export const OPPORTUNITY_STANDARD_FIELD_IDS = {
  name: '20202020-8609-4f65-a2d9-44009eb422b5',
  amount: '20202020-583e-4642-8533-db761d5fa82f',
  closeDate: '20202020-527e-44d6-b1ac-c4158d307b97',
  probability: '20202020-69d4-45f3-9703-690b09fafcf0',
  stage: '20202020-6f76-477d-8551-28cd65b2b4b9',
  position: '20202020-806d-493a-bbc6-6313e62958e2',
  pointOfContact: '20202020-8dfb-42fc-92b6-01afb759ed16',
  company: '20202020-cbac-457e-b565-adece5fc815f',
  favorites: '20202020-a1c2-4500-aaae-83ba8a0e827a',
  activityTargets: '20202020-220a-42d6-8261-b2102d6eab35',
  attachments: '20202020-87c7-4118-83d6-2f4031005209',
  timelineActivities: '20202020-30e2-421f-96c7-19c69d1cf631',
};

export const PERSON_STANDARD_FIELD_IDS = {
  name: '20202020-3875-44d5-8c33-a6239011cab8',
  email: '20202020-a740-42bb-8849-8980fb3f12e1',
  linkedinLink: '20202020-f1af-48f7-893b-2007a73dd508',
  xLink: '20202020-8fc2-487c-b84a-55a99b145cfd',
  jobTitle: '20202020-b0d0-415a-bef9-640a26dacd9b',
  phone: '20202020-4564-4b8b-a09f-05445f2e0bce',
  city: '20202020-5243-4ffb-afc5-2c675da41346',
  avatarUrl: '20202020-b8a6-40df-961c-373dc5d2ec21',
  position: '20202020-fcd5-4231-aff5-fff583eaa0b1',
  company: '20202020-e2f3-448e-b34c-2d625f0025fd',
  pointOfContactForOpportunities: '20202020-911b-4a7d-b67b-918aa9a5b33a',
  activityTargets: '20202020-dee7-4b7f-b50a-1f50bd3be452',
  favorites: '20202020-4073-4117-9cf1-203bcdc91cbd',
  attachments: '20202020-cd97-451f-87fa-bcb789bdbf3a',
  messageParticipants: '20202020-498e-4c61-8158-fa04f0638334',
  calendarEventParticipants: '20202020-52ee-45e9-a702-b64b3753e3a9',
  timelineActivities: '20202020-a43e-4873-9c23-e522de906ce5',
};

export const VIEW_FIELD_STANDARD_FIELD_IDS = {
  fieldMetadataId: '20202020-135f-4c5b-b361-15f24870473c',
  isVisible: '20202020-e966-473c-9c18-f00d3347e0ba',
  size: '20202020-6fab-4bd0-ae72-20f3ee39d581',
  position: '20202020-19e5-4e4c-8c15-3a96d1fd0650',
  view: '20202020-e8da-4521-afab-d6d231f9fa18',
};

export const VIEW_FILTER_STANDARD_FIELD_IDS = {
  fieldMetadataId: '20202020-c9aa-4c94-8d0e-9592f5008fb0',
  operand: '20202020-bd23-48c4-9fab-29d1ffb80310',
  value: '20202020-1e55-4a1e-a1d2-fefb86a5fce5',
  displayValue: '20202020-1270-4ebf-9018-c0ec10d5038e',
  view: '20202020-4f5b-487e-829c-3d881c163611',
};

export const VIEW_SORT_STANDARD_FIELD_IDS = {
  fieldMetadataId: '20202020-8240-4657-aee4-7f0df8e94eca',
  direction: '20202020-b06e-4eb3-9b58-0a62e5d79836',
  view: '20202020-bd6c-422b-9167-5c105f2d02c8',
};

export const VIEW_STANDARD_FIELD_IDS = {
  name: '20202020-12c6-4f37-b588-c9b9bf57328d',
  objectMetadataId: '20202020-d6de-4fd5-84dd-47f9e730368b',
  type: '20202020-dd11-4607-9ec7-c57217262a7f',
  key: '20202020-298e-49fa-9f4a-7b416b110443',
  icon: '20202020-1f08-4fd9-929b-cbc07f317166',
  kanbanFieldMetadataId: '20202020-d09b-4f65-ac42-06a2f20ba0e8',
  position: '20202020-e9db-4303-b271-e8250c450172',
  isCompact: '20202020-674e-4314-994d-05754ea7b22b',
  viewFields: '20202020-542b-4bdc-b177-b63175d48edf',
  viewFilters: '20202020-ff23-4154-b63c-21fb36cd0967',
  viewSorts: '20202020-891b-45c3-9fe1-80a75b4aa043',
};

export const WEBHOOK_STANDARD_FIELD_IDS = {
  targetUrl: '20202020-1229-45a8-8cf4-85c9172aae12',
  operation: '20202020-15b7-458e-bf30-74770a54410c',
};

export const WORKSPACE_MEMBER_STANDARD_FIELD_IDS = {
  name: '20202020-e914-43a6-9c26-3603c59065f4',
  colorScheme: '20202020-66bc-47f2-adac-f2ef7c598b63',
  locale: '20202020-402e-4695-b169-794fa015afbe',
  avatarUrl: '20202020-0ced-4c4f-a376-c98a966af3f6',
  userEmail: '20202020-4c5f-4e09-bebc-9e624e21ecf4',
  userId: '20202020-75a9-4dfc-bf25-2e4b43e89820',
  authoredActivities: '20202020-f139-4f13-a82f-a65a8d290a74',
  assignedActivities: '20202020-5c97-42b6-8ca9-c07622cbb33f',
  favorites: '20202020-f3c1-4faf-b343-cf7681038757',
  accountOwnerForCompanies: '20202020-dc29-4bd4-a3c1-29eafa324bee',
  authoredAttachments: '20202020-000f-4947-917f-1b09851024fe',
  authoredComments: '20202020-5536-4f59-b837-51c45ef43b05',
  connectedAccounts: '20202020-e322-4bde-a525-727079b4a100',
  messageParticipants: '20202020-8f99-48bc-a5eb-edd33dd54188',
  blocklist: '20202020-6cb2-4161-9f29-a4b7f1283859',
  calendarEventParticipants: '20202020-0dbc-4841-9ce1-3e793b5b3512',
  timelineActivities: '20202020-e15b-47b8-94fe-8200e3c66615',
  auditLogs: '20202020-2f54-4739-a5e2-99563385e83d',
};

export const CUSTOM_OBJECT_STANDARD_FIELD_IDS = {
  name: '20202020-ba07-4ffd-ba63-009491f5749c',
  position: '20202020-c2bd-4e16-bb9a-c8b0411bf49d',
  activityTargets: '20202020-7f42-40ae-b96c-c8a61acc83bf',
  favorites: '20202020-a4a7-4686-b296-1c6c3482ee21',
  attachments: '20202020-8d59-46ca-b7b2-73d167712134',
  timelineActivities: '20202020-f1ef-4ba4-8f33-1a4577afa477',
};
