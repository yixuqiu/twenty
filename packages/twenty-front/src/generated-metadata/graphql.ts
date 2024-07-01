/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** Cursor for paging through collections */
  ConnectionCursor: { input: any; output: any; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any; }
  /** A UUID scalar type */
  UUID: { input: any; output: any; }
  /** The `Upload` scalar type represents a file upload. */
  Upload: { input: any; output: any; }
};

export type ActivateWorkspaceInput = {
  displayName?: InputMaybe<Scalars['String']['input']>;
};

export type Analytics = {
  __typename?: 'Analytics';
  /** Boolean that confirms query was dispatched */
  success: Scalars['Boolean']['output'];
};

export type ApiConfig = {
  __typename?: 'ApiConfig';
  mutationMaximumAffectedRecords: Scalars['Float']['output'];
};

export type ApiKeyToken = {
  __typename?: 'ApiKeyToken';
  token: Scalars['String']['output'];
};

export type AppToken = {
  __typename?: 'AppToken';
  createdAt: Scalars['DateTime']['output'];
  expiresAt: Scalars['DateTime']['output'];
  id: Scalars['UUID']['output'];
  type: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type AppTokenEdge = {
  __typename?: 'AppTokenEdge';
  /** Cursor for this node. */
  cursor: Scalars['ConnectionCursor']['output'];
  /** The node containing the AppToken */
  node: AppToken;
};

export type AuthProviders = {
  __typename?: 'AuthProviders';
  google: Scalars['Boolean']['output'];
  magicLink: Scalars['Boolean']['output'];
  microsoft: Scalars['Boolean']['output'];
  password: Scalars['Boolean']['output'];
};

export type AuthToken = {
  __typename?: 'AuthToken';
  expiresAt: Scalars['DateTime']['output'];
  token: Scalars['String']['output'];
};

export type AuthTokenPair = {
  __typename?: 'AuthTokenPair';
  accessToken: AuthToken;
  refreshToken: AuthToken;
};

export type AuthTokens = {
  __typename?: 'AuthTokens';
  tokens: AuthTokenPair;
};

export type AuthorizeApp = {
  __typename?: 'AuthorizeApp';
  redirectUrl: Scalars['String']['output'];
};

export type Billing = {
  __typename?: 'Billing';
  billingFreeTrialDurationInDays?: Maybe<Scalars['Float']['output']>;
  billingUrl?: Maybe<Scalars['String']['output']>;
  isBillingEnabled: Scalars['Boolean']['output'];
};

export type BillingSubscription = {
  __typename?: 'BillingSubscription';
  id: Scalars['UUID']['output'];
  interval?: Maybe<SubscriptionInterval>;
  status: SubscriptionStatus;
};

export type BillingSubscriptionFilter = {
  and?: InputMaybe<Array<BillingSubscriptionFilter>>;
  id?: InputMaybe<UuidFilterComparison>;
  or?: InputMaybe<Array<BillingSubscriptionFilter>>;
};

export type BillingSubscriptionSort = {
  direction: SortDirection;
  field: BillingSubscriptionSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum BillingSubscriptionSortFields {
  Id = 'id'
}

export type BooleanFieldComparison = {
  is?: InputMaybe<Scalars['Boolean']['input']>;
  isNot?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Visibility of the calendar channel */
export enum CalendarChannelVisibility {
  Metadata = 'METADATA',
  ShareEverything = 'SHARE_EVERYTHING'
}

export type Captcha = {
  __typename?: 'Captcha';
  provider?: Maybe<CaptchaDriverType>;
  siteKey?: Maybe<Scalars['String']['output']>;
};

export enum CaptchaDriverType {
  GoogleRecaptcha = 'GoogleRecaptcha',
  Turnstile = 'Turnstile'
}

export type ClientConfig = {
  __typename?: 'ClientConfig';
  api: ApiConfig;
  authProviders: AuthProviders;
  billing: Billing;
  captcha: Captcha;
  chromeExtensionId?: Maybe<Scalars['String']['output']>;
  debugMode: Scalars['Boolean']['output'];
  sentry: Sentry;
  signInPrefilled: Scalars['Boolean']['output'];
  signUpDisabled: Scalars['Boolean']['output'];
  support: Support;
  telemetry: Telemetry;
};

export type CreateAppTokenInput = {
  expiresAt: Scalars['DateTime']['input'];
};

export type CreateFieldInput = {
  defaultValue?: InputMaybe<Scalars['JSON']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  icon?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  isCustom?: InputMaybe<Scalars['Boolean']['input']>;
  isNullable?: InputMaybe<Scalars['Boolean']['input']>;
  isRemoteCreation?: InputMaybe<Scalars['Boolean']['input']>;
  isSystem?: InputMaybe<Scalars['Boolean']['input']>;
  label: Scalars['String']['input'];
  name: Scalars['String']['input'];
  objectMetadataId: Scalars['String']['input'];
  options?: InputMaybe<Scalars['JSON']['input']>;
  settings?: InputMaybe<Scalars['JSON']['input']>;
  type: FieldMetadataType;
};

export type CreateObjectInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  icon?: InputMaybe<Scalars['String']['input']>;
  imageIdentifierFieldMetadataId?: InputMaybe<Scalars['String']['input']>;
  isRemote?: InputMaybe<Scalars['Boolean']['input']>;
  labelIdentifierFieldMetadataId?: InputMaybe<Scalars['String']['input']>;
  labelPlural: Scalars['String']['input'];
  labelSingular: Scalars['String']['input'];
  namePlural: Scalars['String']['input'];
  nameSingular: Scalars['String']['input'];
  primaryKeyColumnType?: InputMaybe<Scalars['String']['input']>;
  primaryKeyFieldMetadataSettings?: InputMaybe<Scalars['JSON']['input']>;
};

export type CreateOneAppTokenInput = {
  /** The record to create */
  appToken: CreateAppTokenInput;
};

export type CreateOneFieldMetadataInput = {
  /** The record to create */
  field: CreateFieldInput;
};

export type CreateOneObjectInput = {
  /** The record to create */
  object: CreateObjectInput;
};

export type CreateOneRelationInput = {
  /** The record to create */
  relation: CreateRelationInput;
};

export type CreateRelationInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  fromDescription?: InputMaybe<Scalars['String']['input']>;
  fromIcon?: InputMaybe<Scalars['String']['input']>;
  fromLabel: Scalars['String']['input'];
  fromName: Scalars['String']['input'];
  fromObjectMetadataId: Scalars['String']['input'];
  relationType: RelationMetadataType;
  toDescription?: InputMaybe<Scalars['String']['input']>;
  toIcon?: InputMaybe<Scalars['String']['input']>;
  toLabel: Scalars['String']['input'];
  toName: Scalars['String']['input'];
  toObjectMetadataId: Scalars['String']['input'];
};

export type CreateRemoteServerInput = {
  foreignDataWrapperOptions: Scalars['JSON']['input'];
  foreignDataWrapperType: Scalars['String']['input'];
  label: Scalars['String']['input'];
  schema?: InputMaybe<Scalars['String']['input']>;
  userMappingOptions?: InputMaybe<UserMappingOptions>;
};

export type CursorPaging = {
  /** Paginate after opaque cursor */
  after?: InputMaybe<Scalars['ConnectionCursor']['input']>;
  /** Paginate before opaque cursor */
  before?: InputMaybe<Scalars['ConnectionCursor']['input']>;
  /** Paginate first */
  first?: InputMaybe<Scalars['Int']['input']>;
  /** Paginate last */
  last?: InputMaybe<Scalars['Int']['input']>;
};

export type DeleteOneFieldInput = {
  /** The id of the field to delete. */
  id: Scalars['UUID']['input'];
};

export type DeleteOneObjectInput = {
  /** The id of the record to delete. */
  id: Scalars['UUID']['input'];
};

export type DeleteOneRelationInput = {
  /** The id of the relation to delete. */
  id: Scalars['UUID']['input'];
};

/** Schema update on a table */
export enum DistantTableUpdate {
  ColumnsAdded = 'COLUMNS_ADDED',
  ColumnsDeleted = 'COLUMNS_DELETED',
  ColumnsTypeChanged = 'COLUMNS_TYPE_CHANGED',
  TableDeleted = 'TABLE_DELETED'
}

export type EmailPasswordResetLink = {
  __typename?: 'EmailPasswordResetLink';
  /** Boolean that confirms query was dispatched */
  success: Scalars['Boolean']['output'];
};

export type ExchangeAuthCode = {
  __typename?: 'ExchangeAuthCode';
  accessToken: AuthToken;
  loginToken: AuthToken;
  refreshToken: AuthToken;
};

export type FeatureFlag = {
  __typename?: 'FeatureFlag';
  id: Scalars['UUID']['output'];
  key: Scalars['String']['output'];
  value: Scalars['Boolean']['output'];
  workspaceId: Scalars['String']['output'];
};

export type FeatureFlagFilter = {
  and?: InputMaybe<Array<FeatureFlagFilter>>;
  id?: InputMaybe<UuidFilterComparison>;
  or?: InputMaybe<Array<FeatureFlagFilter>>;
};

export type FeatureFlagSort = {
  direction: SortDirection;
  field: FeatureFlagSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum FeatureFlagSortFields {
  Id = 'id'
}

export type FieldConnection = {
  __typename?: 'FieldConnection';
  /** Array of edges. */
  edges: Array<FieldEdge>;
  /** Paging information */
  pageInfo: PageInfo;
};

/** Type of the field */
export enum FieldMetadataType {
  Address = 'ADDRESS',
  Boolean = 'BOOLEAN',
  Currency = 'CURRENCY',
  Date = 'DATE',
  DateTime = 'DATE_TIME',
  Email = 'EMAIL',
  FullName = 'FULL_NAME',
  Link = 'LINK',
  Links = 'LINKS',
  MultiSelect = 'MULTI_SELECT',
  Number = 'NUMBER',
  Numeric = 'NUMERIC',
  Phone = 'PHONE',
  Position = 'POSITION',
  Probability = 'PROBABILITY',
  Rating = 'RATING',
  RawJson = 'RAW_JSON',
  Relation = 'RELATION',
  Select = 'SELECT',
  Text = 'TEXT',
  Uuid = 'UUID'
}

export enum FileFolder {
  Attachment = 'Attachment',
  PersonPicture = 'PersonPicture',
  ProfilePicture = 'ProfilePicture',
  WorkspaceLogo = 'WorkspaceLogo'
}

export type FindManyRemoteTablesInput = {
  /** The id of the remote server. */
  id: Scalars['ID']['input'];
  /** Indicates if pending schema updates status should be computed. */
  shouldFetchPendingSchemaUpdates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type FullName = {
  __typename?: 'FullName';
  firstName: Scalars['String']['output'];
  lastName: Scalars['String']['output'];
};

export type InvalidatePassword = {
  __typename?: 'InvalidatePassword';
  /** Boolean that confirms query was dispatched */
  success: Scalars['Boolean']['output'];
};

export type LinkMetadata = {
  __typename?: 'LinkMetadata';
  label: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type LoginToken = {
  __typename?: 'LoginToken';
  loginToken: AuthToken;
};

/** Visibility of the message channel */
export enum MessageChannelVisibility {
  Metadata = 'METADATA',
  ShareEverything = 'SHARE_EVERYTHING',
  Subject = 'SUBJECT'
}

export type Mutation = {
  __typename?: 'Mutation';
  activateWorkspace: Workspace;
  addUserToWorkspace: User;
  authorizeApp: AuthorizeApp;
  challenge: LoginToken;
  checkoutSession: SessionEntity;
  createOneAppToken: AppToken;
  createOneField: Field;
  createOneObject: Object;
  createOneRelation: Relation;
  createOneRemoteServer: RemoteServer;
  deleteCurrentWorkspace: Workspace;
  deleteOneField: Field;
  deleteOneObject: Object;
  deleteOneRelation: Relation;
  deleteOneRemoteServer: RemoteServer;
  deleteUser: User;
  disablePostgresProxy: PostgresCredentials;
  emailPasswordResetLink: EmailPasswordResetLink;
  enablePostgresProxy: PostgresCredentials;
  exchangeAuthorizationCode: ExchangeAuthCode;
  generateApiKeyToken: ApiKeyToken;
  generateJWT: AuthTokens;
  generateTransientToken: TransientToken;
  impersonate: Verify;
  renewToken: AuthTokens;
  sendInviteLink: SendInviteLink;
  signUp: LoginToken;
  skipSyncEmailOnboardingStep: OnboardingStepSuccess;
  syncRemoteTable: RemoteTable;
  syncRemoteTableSchemaChanges: RemoteTable;
  track: Analytics;
  unsyncRemoteTable: RemoteTable;
  updateBillingSubscription: UpdateBillingEntity;
  updateOneField: Field;
  updateOneObject: Object;
  updateOneRemoteServer: RemoteServer;
  updatePasswordViaResetToken: InvalidatePassword;
  updateWorkspace: Workspace;
  uploadFile: Scalars['String']['output'];
  uploadImage: Scalars['String']['output'];
  uploadProfilePicture: Scalars['String']['output'];
  uploadWorkspaceLogo: Scalars['String']['output'];
  verify: Verify;
};


export type MutationActivateWorkspaceArgs = {
  data: ActivateWorkspaceInput;
};


export type MutationAddUserToWorkspaceArgs = {
  inviteHash: Scalars['String']['input'];
};


export type MutationAuthorizeAppArgs = {
  clientId: Scalars['String']['input'];
  codeChallenge?: InputMaybe<Scalars['String']['input']>;
  redirectUrl: Scalars['String']['input'];
};


export type MutationChallengeArgs = {
  captchaToken?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationCheckoutSessionArgs = {
  recurringInterval: SubscriptionInterval;
  successUrlPath?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreateOneAppTokenArgs = {
  input: CreateOneAppTokenInput;
};


export type MutationCreateOneFieldArgs = {
  input: CreateOneFieldMetadataInput;
};


export type MutationCreateOneObjectArgs = {
  input: CreateOneObjectInput;
};


export type MutationCreateOneRelationArgs = {
  input: CreateOneRelationInput;
};


export type MutationCreateOneRemoteServerArgs = {
  input: CreateRemoteServerInput;
};


export type MutationDeleteOneFieldArgs = {
  input: DeleteOneFieldInput;
};


export type MutationDeleteOneObjectArgs = {
  input: DeleteOneObjectInput;
};


export type MutationDeleteOneRelationArgs = {
  input: DeleteOneRelationInput;
};


export type MutationDeleteOneRemoteServerArgs = {
  input: RemoteServerIdInput;
};


export type MutationEmailPasswordResetLinkArgs = {
  email: Scalars['String']['input'];
};


export type MutationExchangeAuthorizationCodeArgs = {
  authorizationCode: Scalars['String']['input'];
  clientSecret?: InputMaybe<Scalars['String']['input']>;
  codeVerifier?: InputMaybe<Scalars['String']['input']>;
};


export type MutationGenerateApiKeyTokenArgs = {
  apiKeyId: Scalars['String']['input'];
  expiresAt: Scalars['String']['input'];
};


export type MutationGenerateJwtArgs = {
  workspaceId: Scalars['String']['input'];
};


export type MutationImpersonateArgs = {
  userId: Scalars['String']['input'];
};


export type MutationRenewTokenArgs = {
  appToken: Scalars['String']['input'];
};


export type MutationSendInviteLinkArgs = {
  emails: Array<Scalars['String']['input']>;
};


export type MutationSignUpArgs = {
  captchaToken?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  workspaceInviteHash?: InputMaybe<Scalars['String']['input']>;
};


export type MutationSyncRemoteTableArgs = {
  input: RemoteTableInput;
};


export type MutationSyncRemoteTableSchemaChangesArgs = {
  input: RemoteTableInput;
};


export type MutationTrackArgs = {
  data: Scalars['JSON']['input'];
  type: Scalars['String']['input'];
};


export type MutationUnsyncRemoteTableArgs = {
  input: RemoteTableInput;
};


export type MutationUpdateOneFieldArgs = {
  input: UpdateOneFieldMetadataInput;
};


export type MutationUpdateOneObjectArgs = {
  input: UpdateOneObjectInput;
};


export type MutationUpdateOneRemoteServerArgs = {
  input: UpdateRemoteServerInput;
};


export type MutationUpdatePasswordViaResetTokenArgs = {
  newPassword: Scalars['String']['input'];
  passwordResetToken: Scalars['String']['input'];
};


export type MutationUpdateWorkspaceArgs = {
  data: UpdateWorkspaceInput;
};


export type MutationUploadFileArgs = {
  file: Scalars['Upload']['input'];
  fileFolder?: InputMaybe<FileFolder>;
};


export type MutationUploadImageArgs = {
  file: Scalars['Upload']['input'];
  fileFolder?: InputMaybe<FileFolder>;
};


export type MutationUploadProfilePictureArgs = {
  file: Scalars['Upload']['input'];
};


export type MutationUploadWorkspaceLogoArgs = {
  file: Scalars['Upload']['input'];
};


export type MutationVerifyArgs = {
  loginToken: Scalars['String']['input'];
};

export type ObjectConnection = {
  __typename?: 'ObjectConnection';
  /** Array of edges. */
  edges: Array<ObjectEdge>;
  /** Paging information */
  pageInfo: PageInfo;
};

export type ObjectFieldsConnection = {
  __typename?: 'ObjectFieldsConnection';
  /** Array of edges. */
  edges: Array<FieldEdge>;
  /** Paging information */
  pageInfo: PageInfo;
};

/** Onboarding status */
export enum OnboardingStatus {
  Completed = 'COMPLETED',
  InviteTeam = 'INVITE_TEAM',
  PlanRequired = 'PLAN_REQUIRED',
  ProfileCreation = 'PROFILE_CREATION',
  SyncEmail = 'SYNC_EMAIL',
  WorkspaceActivation = 'WORKSPACE_ACTIVATION'
}

export type OnboardingStepSuccess = {
  __typename?: 'OnboardingStepSuccess';
  /** Boolean that confirms query was dispatched */
  success: Scalars['Boolean']['output'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  /** The cursor of the last returned record. */
  endCursor?: Maybe<Scalars['ConnectionCursor']['output']>;
  /** true if paging forward and there are more records. */
  hasNextPage?: Maybe<Scalars['Boolean']['output']>;
  /** true if paging backwards and there are more records. */
  hasPreviousPage?: Maybe<Scalars['Boolean']['output']>;
  /** The cursor of the first returned record. */
  startCursor?: Maybe<Scalars['ConnectionCursor']['output']>;
};

export type PostgresCredentials = {
  __typename?: 'PostgresCredentials';
  id: Scalars['UUID']['output'];
  password: Scalars['String']['output'];
  user: Scalars['String']['output'];
  workspaceId: Scalars['String']['output'];
};

export type ProductPriceEntity = {
  __typename?: 'ProductPriceEntity';
  created: Scalars['Float']['output'];
  recurringInterval: SubscriptionInterval;
  stripePriceId: Scalars['String']['output'];
  unitAmount: Scalars['Float']['output'];
};

export type ProductPricesEntity = {
  __typename?: 'ProductPricesEntity';
  productPrices: Array<ProductPriceEntity>;
  totalNumberOfPrices: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  billingPortalSession: SessionEntity;
  checkUserExists: UserExists;
  checkWorkspaceInviteHashIsValid: WorkspaceInviteHashValid;
  clientConfig: ClientConfig;
  currentUser: User;
  currentWorkspace: Workspace;
  field: Field;
  fields: FieldConnection;
  findDistantTablesWithStatus: Array<RemoteTable>;
  findManyRemoteServersByType: Array<RemoteServer>;
  findOneRemoteServerById: RemoteServer;
  findWorkspaceFromInviteHash: Workspace;
  getPostgresCredentials?: Maybe<PostgresCredentials>;
  getProductPrices: ProductPricesEntity;
  getTimelineCalendarEventsFromCompanyId: TimelineCalendarEventsWithTotal;
  getTimelineCalendarEventsFromPersonId: TimelineCalendarEventsWithTotal;
  getTimelineThreadsFromCompanyId: TimelineThreadsWithTotal;
  getTimelineThreadsFromPersonId: TimelineThreadsWithTotal;
  object: Object;
  objects: ObjectConnection;
  relation: Relation;
  relations: RelationConnection;
  validatePasswordResetToken: ValidatePasswordResetToken;
};


export type QueryBillingPortalSessionArgs = {
  returnUrlPath?: InputMaybe<Scalars['String']['input']>;
};


export type QueryCheckUserExistsArgs = {
  captchaToken?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
};


export type QueryCheckWorkspaceInviteHashIsValidArgs = {
  inviteHash: Scalars['String']['input'];
};


export type QueryFieldArgs = {
  id: Scalars['UUID']['input'];
};


export type QueryFieldsArgs = {
  filter?: FieldFilter;
  paging?: CursorPaging;
};


export type QueryFindDistantTablesWithStatusArgs = {
  input: FindManyRemoteTablesInput;
};


export type QueryFindManyRemoteServersByTypeArgs = {
  input: RemoteServerTypeInput;
};


export type QueryFindOneRemoteServerByIdArgs = {
  input: RemoteServerIdInput;
};


export type QueryFindWorkspaceFromInviteHashArgs = {
  inviteHash: Scalars['String']['input'];
};


export type QueryGetProductPricesArgs = {
  product: Scalars['String']['input'];
};


export type QueryGetTimelineCalendarEventsFromCompanyIdArgs = {
  companyId: Scalars['UUID']['input'];
  page: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
};


export type QueryGetTimelineCalendarEventsFromPersonIdArgs = {
  page: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
  personId: Scalars['UUID']['input'];
};


export type QueryGetTimelineThreadsFromCompanyIdArgs = {
  companyId: Scalars['UUID']['input'];
  page: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
};


export type QueryGetTimelineThreadsFromPersonIdArgs = {
  page: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
  personId: Scalars['UUID']['input'];
};


export type QueryObjectArgs = {
  id: Scalars['UUID']['input'];
};


export type QueryObjectsArgs = {
  filter?: ObjectFilter;
  paging?: CursorPaging;
};


export type QueryRelationArgs = {
  id: Scalars['UUID']['input'];
};


export type QueryRelationsArgs = {
  paging?: CursorPaging;
};


export type QueryValidatePasswordResetTokenArgs = {
  passwordResetToken: Scalars['String']['input'];
};

export type RelationConnection = {
  __typename?: 'RelationConnection';
  /** Array of edges. */
  edges: Array<RelationEdge>;
  /** Paging information */
  pageInfo: PageInfo;
};

export type RelationDefinition = {
  __typename?: 'RelationDefinition';
  direction: RelationDefinitionType;
  relationId: Scalars['UUID']['output'];
  sourceFieldMetadata: Field;
  sourceObjectMetadata: Object;
  targetFieldMetadata: Field;
  targetObjectMetadata: Object;
};

/** Relation definition type */
export enum RelationDefinitionType {
  ManyToMany = 'MANY_TO_MANY',
  ManyToOne = 'MANY_TO_ONE',
  OneToMany = 'ONE_TO_MANY',
  OneToOne = 'ONE_TO_ONE'
}

/** Type of the relation */
export enum RelationMetadataType {
  ManyToMany = 'MANY_TO_MANY',
  ManyToOne = 'MANY_TO_ONE',
  OneToMany = 'ONE_TO_MANY',
  OneToOne = 'ONE_TO_ONE'
}

export type RemoteServer = {
  __typename?: 'RemoteServer';
  createdAt: Scalars['DateTime']['output'];
  foreignDataWrapperId: Scalars['ID']['output'];
  foreignDataWrapperOptions?: Maybe<Scalars['JSON']['output']>;
  foreignDataWrapperType: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  label: Scalars['String']['output'];
  schema?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  userMappingOptions?: Maybe<UserMappingOptionsUser>;
};

export type RemoteServerIdInput = {
  /** The id of the record. */
  id: Scalars['ID']['input'];
};

export type RemoteServerTypeInput = {
  foreignDataWrapperType: Scalars['String']['input'];
};

export type RemoteTable = {
  __typename?: 'RemoteTable';
  id?: Maybe<Scalars['UUID']['output']>;
  name: Scalars['String']['output'];
  schema?: Maybe<Scalars['String']['output']>;
  schemaPendingUpdates?: Maybe<Array<DistantTableUpdate>>;
  status: RemoteTableStatus;
};

export type RemoteTableInput = {
  name: Scalars['String']['input'];
  remoteServerId: Scalars['ID']['input'];
};

/** Status of the table */
export enum RemoteTableStatus {
  NotSynced = 'NOT_SYNCED',
  Synced = 'SYNCED'
}

export type SendInviteLink = {
  __typename?: 'SendInviteLink';
  /** Boolean that confirms query was dispatched */
  success: Scalars['Boolean']['output'];
};

export type Sentry = {
  __typename?: 'Sentry';
  dsn?: Maybe<Scalars['String']['output']>;
  environment?: Maybe<Scalars['String']['output']>;
  release?: Maybe<Scalars['String']['output']>;
};

export type SessionEntity = {
  __typename?: 'SessionEntity';
  url?: Maybe<Scalars['String']['output']>;
};

/** Sort Directions */
export enum SortDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

/** Sort Nulls Options */
export enum SortNulls {
  NullsFirst = 'NULLS_FIRST',
  NullsLast = 'NULLS_LAST'
}

export enum SubscriptionInterval {
  Day = 'Day',
  Month = 'Month',
  Week = 'Week',
  Year = 'Year'
}

export enum SubscriptionStatus {
  Active = 'Active',
  Canceled = 'Canceled',
  Incomplete = 'Incomplete',
  IncompleteExpired = 'IncompleteExpired',
  PastDue = 'PastDue',
  Paused = 'Paused',
  Trialing = 'Trialing',
  Unpaid = 'Unpaid'
}

export type Support = {
  __typename?: 'Support';
  supportDriver: Scalars['String']['output'];
  supportFrontChatId?: Maybe<Scalars['String']['output']>;
};

export type Telemetry = {
  __typename?: 'Telemetry';
  enabled: Scalars['Boolean']['output'];
};

export type TimelineCalendarEvent = {
  __typename?: 'TimelineCalendarEvent';
  conferenceLink: LinkMetadata;
  conferenceSolution: Scalars['String']['output'];
  description: Scalars['String']['output'];
  endsAt: Scalars['DateTime']['output'];
  id: Scalars['UUID']['output'];
  isCanceled: Scalars['Boolean']['output'];
  isFullDay: Scalars['Boolean']['output'];
  location: Scalars['String']['output'];
  participants: Array<TimelineCalendarEventParticipant>;
  startsAt: Scalars['DateTime']['output'];
  title: Scalars['String']['output'];
  visibility: CalendarChannelVisibility;
};

export type TimelineCalendarEventParticipant = {
  __typename?: 'TimelineCalendarEventParticipant';
  avatarUrl: Scalars['String']['output'];
  displayName: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  handle: Scalars['String']['output'];
  lastName: Scalars['String']['output'];
  personId?: Maybe<Scalars['UUID']['output']>;
  workspaceMemberId?: Maybe<Scalars['UUID']['output']>;
};

export type TimelineCalendarEventsWithTotal = {
  __typename?: 'TimelineCalendarEventsWithTotal';
  timelineCalendarEvents: Array<TimelineCalendarEvent>;
  totalNumberOfCalendarEvents: Scalars['Int']['output'];
};

export type TimelineThread = {
  __typename?: 'TimelineThread';
  firstParticipant: TimelineThreadParticipant;
  id: Scalars['UUID']['output'];
  lastMessageBody: Scalars['String']['output'];
  lastMessageReceivedAt: Scalars['DateTime']['output'];
  lastTwoParticipants: Array<TimelineThreadParticipant>;
  numberOfMessagesInThread: Scalars['Float']['output'];
  participantCount: Scalars['Float']['output'];
  read: Scalars['Boolean']['output'];
  subject: Scalars['String']['output'];
  visibility: MessageChannelVisibility;
};

export type TimelineThreadParticipant = {
  __typename?: 'TimelineThreadParticipant';
  avatarUrl: Scalars['String']['output'];
  displayName: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  handle: Scalars['String']['output'];
  lastName: Scalars['String']['output'];
  personId?: Maybe<Scalars['UUID']['output']>;
  workspaceMemberId?: Maybe<Scalars['UUID']['output']>;
};

export type TimelineThreadsWithTotal = {
  __typename?: 'TimelineThreadsWithTotal';
  timelineThreads: Array<TimelineThread>;
  totalNumberOfThreads: Scalars['Int']['output'];
};

export type TransientToken = {
  __typename?: 'TransientToken';
  transientToken: AuthToken;
};

export type UuidFilterComparison = {
  eq?: InputMaybe<Scalars['UUID']['input']>;
  gt?: InputMaybe<Scalars['UUID']['input']>;
  gte?: InputMaybe<Scalars['UUID']['input']>;
  iLike?: InputMaybe<Scalars['UUID']['input']>;
  in?: InputMaybe<Array<Scalars['UUID']['input']>>;
  is?: InputMaybe<Scalars['Boolean']['input']>;
  isNot?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['UUID']['input']>;
  lt?: InputMaybe<Scalars['UUID']['input']>;
  lte?: InputMaybe<Scalars['UUID']['input']>;
  neq?: InputMaybe<Scalars['UUID']['input']>;
  notILike?: InputMaybe<Scalars['UUID']['input']>;
  notIn?: InputMaybe<Array<Scalars['UUID']['input']>>;
  notLike?: InputMaybe<Scalars['UUID']['input']>;
};

export type UpdateBillingEntity = {
  __typename?: 'UpdateBillingEntity';
  /** Boolean that confirms query was successful */
  success: Scalars['Boolean']['output'];
};

export type UpdateFieldInput = {
  defaultValue?: InputMaybe<Scalars['JSON']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  icon?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  isCustom?: InputMaybe<Scalars['Boolean']['input']>;
  isNullable?: InputMaybe<Scalars['Boolean']['input']>;
  isSystem?: InputMaybe<Scalars['Boolean']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  options?: InputMaybe<Scalars['JSON']['input']>;
  settings?: InputMaybe<Scalars['JSON']['input']>;
};

export type UpdateObjectPayload = {
  description?: InputMaybe<Scalars['String']['input']>;
  icon?: InputMaybe<Scalars['String']['input']>;
  imageIdentifierFieldMetadataId?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  labelIdentifierFieldMetadataId?: InputMaybe<Scalars['String']['input']>;
  labelPlural?: InputMaybe<Scalars['String']['input']>;
  labelSingular?: InputMaybe<Scalars['String']['input']>;
  namePlural?: InputMaybe<Scalars['String']['input']>;
  nameSingular?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateOneFieldMetadataInput = {
  /** The id of the record to update */
  id: Scalars['UUID']['input'];
  /** The record to update */
  update: UpdateFieldInput;
};

export type UpdateOneObjectInput = {
  /** The id of the object to update */
  id: Scalars['UUID']['input'];
  update: UpdateObjectPayload;
};

export type UpdateRemoteServerInput = {
  foreignDataWrapperOptions?: InputMaybe<Scalars['JSON']['input']>;
  id: Scalars['String']['input'];
  label?: InputMaybe<Scalars['String']['input']>;
  schema?: InputMaybe<Scalars['String']['input']>;
  userMappingOptions?: InputMaybe<UserMappingOptionsUpdateInput>;
};

export type UpdateWorkspaceInput = {
  allowImpersonation?: InputMaybe<Scalars['Boolean']['input']>;
  displayName?: InputMaybe<Scalars['String']['input']>;
  domainName?: InputMaybe<Scalars['String']['input']>;
  inviteHash?: InputMaybe<Scalars['String']['input']>;
  logo?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  canImpersonate: Scalars['Boolean']['output'];
  createdAt: Scalars['DateTime']['output'];
  defaultAvatarUrl?: Maybe<Scalars['String']['output']>;
  defaultWorkspace: Workspace;
  defaultWorkspaceId: Scalars['String']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  disabled?: Maybe<Scalars['Boolean']['output']>;
  email: Scalars['String']['output'];
  emailVerified: Scalars['Boolean']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
  lastName: Scalars['String']['output'];
  onboardingStatus?: Maybe<OnboardingStatus>;
  passwordHash?: Maybe<Scalars['String']['output']>;
  /** @deprecated field migrated into the AppTokens Table ref: https://github.com/twentyhq/twenty/issues/5021 */
  passwordResetToken?: Maybe<Scalars['String']['output']>;
  /** @deprecated field migrated into the AppTokens Table ref: https://github.com/twentyhq/twenty/issues/5021 */
  passwordResetTokenExpiresAt?: Maybe<Scalars['DateTime']['output']>;
  supportUserHash?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  workspaceMember?: Maybe<WorkspaceMember>;
  workspaces: Array<UserWorkspace>;
};

export type UserEdge = {
  __typename?: 'UserEdge';
  /** Cursor for this node. */
  cursor: Scalars['ConnectionCursor']['output'];
  /** The node containing the User */
  node: User;
};

export type UserExists = {
  __typename?: 'UserExists';
  exists: Scalars['Boolean']['output'];
};

export type UserMappingOptions = {
  password?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<Scalars['String']['input']>;
};

export type UserMappingOptionsUpdateInput = {
  password?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<Scalars['String']['input']>;
};

export type UserMappingOptionsUser = {
  __typename?: 'UserMappingOptionsUser';
  user?: Maybe<Scalars['String']['output']>;
};

export type UserWorkspace = {
  __typename?: 'UserWorkspace';
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['UUID']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user: User;
  userId: Scalars['String']['output'];
  workspace?: Maybe<Workspace>;
  workspaceId: Scalars['String']['output'];
};

export type ValidatePasswordResetToken = {
  __typename?: 'ValidatePasswordResetToken';
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
};

export type Verify = {
  __typename?: 'Verify';
  tokens: AuthTokenPair;
  user: User;
};

export type Workspace = {
  __typename?: 'Workspace';
  activationStatus: Scalars['String']['output'];
  allowImpersonation: Scalars['Boolean']['output'];
  billingSubscriptions?: Maybe<Array<BillingSubscription>>;
  createdAt: Scalars['DateTime']['output'];
  currentBillingSubscription?: Maybe<BillingSubscription>;
  currentCacheVersion?: Maybe<Scalars['String']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  displayName?: Maybe<Scalars['String']['output']>;
  domainName?: Maybe<Scalars['String']['output']>;
  featureFlags?: Maybe<Array<FeatureFlag>>;
  id: Scalars['UUID']['output'];
  inviteHash?: Maybe<Scalars['String']['output']>;
  logo?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  workspaceMembersCount?: Maybe<Scalars['Float']['output']>;
};


export type WorkspaceBillingSubscriptionsArgs = {
  filter?: BillingSubscriptionFilter;
  sorting?: Array<BillingSubscriptionSort>;
};


export type WorkspaceFeatureFlagsArgs = {
  filter?: FeatureFlagFilter;
  sorting?: Array<FeatureFlagSort>;
};

export type WorkspaceEdge = {
  __typename?: 'WorkspaceEdge';
  /** Cursor for this node. */
  cursor: Scalars['ConnectionCursor']['output'];
  /** The node containing the Workspace */
  node: Workspace;
};

export type WorkspaceInviteHashValid = {
  __typename?: 'WorkspaceInviteHashValid';
  isValid: Scalars['Boolean']['output'];
};

export type WorkspaceMember = {
  __typename?: 'WorkspaceMember';
  avatarUrl?: Maybe<Scalars['String']['output']>;
  colorScheme: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
  locale: Scalars['String']['output'];
  name: FullName;
};

export type Field = {
  __typename?: 'field';
  createdAt: Scalars['DateTime']['output'];
  defaultValue?: Maybe<Scalars['JSON']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  fromRelationMetadata?: Maybe<Relation>;
  icon?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  isActive?: Maybe<Scalars['Boolean']['output']>;
  isCustom?: Maybe<Scalars['Boolean']['output']>;
  isNullable?: Maybe<Scalars['Boolean']['output']>;
  isSystem?: Maybe<Scalars['Boolean']['output']>;
  label: Scalars['String']['output'];
  name: Scalars['String']['output'];
  options?: Maybe<Scalars['JSON']['output']>;
  relationDefinition?: Maybe<RelationDefinition>;
  settings?: Maybe<Scalars['JSON']['output']>;
  toRelationMetadata?: Maybe<Relation>;
  type: FieldMetadataType;
  updatedAt: Scalars['DateTime']['output'];
};

export type FieldEdge = {
  __typename?: 'fieldEdge';
  /** Cursor for this node. */
  cursor: Scalars['ConnectionCursor']['output'];
  /** The node containing the field */
  node: Field;
};

export type FieldFilter = {
  and?: InputMaybe<Array<FieldFilter>>;
  id?: InputMaybe<UuidFilterComparison>;
  isActive?: InputMaybe<BooleanFieldComparison>;
  isCustom?: InputMaybe<BooleanFieldComparison>;
  isSystem?: InputMaybe<BooleanFieldComparison>;
  or?: InputMaybe<Array<FieldFilter>>;
};

export type Object = {
  __typename?: 'object';
  createdAt: Scalars['DateTime']['output'];
  dataSourceId: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  fields: ObjectFieldsConnection;
  icon?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  imageIdentifierFieldMetadataId?: Maybe<Scalars['String']['output']>;
  isActive: Scalars['Boolean']['output'];
  isCustom: Scalars['Boolean']['output'];
  isRemote: Scalars['Boolean']['output'];
  isSystem: Scalars['Boolean']['output'];
  labelIdentifierFieldMetadataId?: Maybe<Scalars['String']['output']>;
  labelPlural: Scalars['String']['output'];
  labelSingular: Scalars['String']['output'];
  namePlural: Scalars['String']['output'];
  nameSingular: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};


export type ObjectFieldsArgs = {
  filter?: FieldFilter;
  paging?: CursorPaging;
};

export type ObjectEdge = {
  __typename?: 'objectEdge';
  /** Cursor for this node. */
  cursor: Scalars['ConnectionCursor']['output'];
  /** The node containing the object */
  node: Object;
};

export type ObjectFilter = {
  and?: InputMaybe<Array<ObjectFilter>>;
  id?: InputMaybe<UuidFilterComparison>;
  isActive?: InputMaybe<BooleanFieldComparison>;
  isCustom?: InputMaybe<BooleanFieldComparison>;
  isRemote?: InputMaybe<BooleanFieldComparison>;
  isSystem?: InputMaybe<BooleanFieldComparison>;
  or?: InputMaybe<Array<ObjectFilter>>;
};

export type Relation = {
  __typename?: 'relation';
  createdAt: Scalars['DateTime']['output'];
  fromFieldMetadataId: Scalars['String']['output'];
  fromObjectMetadata: Object;
  fromObjectMetadataId: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
  relationType: RelationMetadataType;
  toFieldMetadataId: Scalars['String']['output'];
  toObjectMetadata: Object;
  toObjectMetadataId: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type RelationEdge = {
  __typename?: 'relationEdge';
  /** Cursor for this node. */
  cursor: Scalars['ConnectionCursor']['output'];
  /** The node containing the relation */
  node: Relation;
};

export type RemoteServerFieldsFragment = { __typename?: 'RemoteServer', id: string, createdAt: any, foreignDataWrapperId: string, foreignDataWrapperOptions?: any | null, foreignDataWrapperType: string, updatedAt: any, schema?: string | null, label: string, userMappingOptions?: { __typename?: 'UserMappingOptionsUser', user?: string | null } | null };

export type RemoteTableFieldsFragment = { __typename?: 'RemoteTable', id?: any | null, name: string, schema?: string | null, status: RemoteTableStatus, schemaPendingUpdates?: Array<DistantTableUpdate> | null };

export type CreateServerMutationVariables = Exact<{
  input: CreateRemoteServerInput;
}>;


export type CreateServerMutation = { __typename?: 'Mutation', createOneRemoteServer: { __typename?: 'RemoteServer', id: string, createdAt: any, foreignDataWrapperId: string, foreignDataWrapperOptions?: any | null, foreignDataWrapperType: string, updatedAt: any, schema?: string | null, label: string, userMappingOptions?: { __typename?: 'UserMappingOptionsUser', user?: string | null } | null } };

export type DeleteServerMutationVariables = Exact<{
  input: RemoteServerIdInput;
}>;


export type DeleteServerMutation = { __typename?: 'Mutation', deleteOneRemoteServer: { __typename?: 'RemoteServer', id: string } };

export type SyncRemoteTableMutationVariables = Exact<{
  input: RemoteTableInput;
}>;


export type SyncRemoteTableMutation = { __typename?: 'Mutation', syncRemoteTable: { __typename?: 'RemoteTable', id?: any | null, name: string, schema?: string | null, status: RemoteTableStatus, schemaPendingUpdates?: Array<DistantTableUpdate> | null } };

export type SyncRemoteTableSchemaChangesMutationVariables = Exact<{
  input: RemoteTableInput;
}>;


export type SyncRemoteTableSchemaChangesMutation = { __typename?: 'Mutation', syncRemoteTableSchemaChanges: { __typename?: 'RemoteTable', id?: any | null, name: string, schema?: string | null, status: RemoteTableStatus, schemaPendingUpdates?: Array<DistantTableUpdate> | null } };

export type UnsyncRemoteTableMutationVariables = Exact<{
  input: RemoteTableInput;
}>;


export type UnsyncRemoteTableMutation = { __typename?: 'Mutation', unsyncRemoteTable: { __typename?: 'RemoteTable', id?: any | null, name: string, schema?: string | null, status: RemoteTableStatus, schemaPendingUpdates?: Array<DistantTableUpdate> | null } };

export type UpdateServerMutationVariables = Exact<{
  input: UpdateRemoteServerInput;
}>;


export type UpdateServerMutation = { __typename?: 'Mutation', updateOneRemoteServer: { __typename?: 'RemoteServer', id: string, createdAt: any, foreignDataWrapperId: string, foreignDataWrapperOptions?: any | null, foreignDataWrapperType: string, updatedAt: any, schema?: string | null, label: string, userMappingOptions?: { __typename?: 'UserMappingOptionsUser', user?: string | null } | null } };

export type GetManyDatabaseConnectionsQueryVariables = Exact<{
  input: RemoteServerTypeInput;
}>;


export type GetManyDatabaseConnectionsQuery = { __typename?: 'Query', findManyRemoteServersByType: Array<{ __typename?: 'RemoteServer', id: string, createdAt: any, foreignDataWrapperId: string, foreignDataWrapperOptions?: any | null, foreignDataWrapperType: string, updatedAt: any, schema?: string | null, label: string, userMappingOptions?: { __typename?: 'UserMappingOptionsUser', user?: string | null } | null }> };

export type GetManyRemoteTablesQueryVariables = Exact<{
  input: FindManyRemoteTablesInput;
}>;


export type GetManyRemoteTablesQuery = { __typename?: 'Query', findDistantTablesWithStatus: Array<{ __typename?: 'RemoteTable', id?: any | null, name: string, schema?: string | null, status: RemoteTableStatus, schemaPendingUpdates?: Array<DistantTableUpdate> | null }> };

export type GetOneDatabaseConnectionQueryVariables = Exact<{
  input: RemoteServerIdInput;
}>;


export type GetOneDatabaseConnectionQuery = { __typename?: 'Query', findOneRemoteServerById: { __typename?: 'RemoteServer', id: string, createdAt: any, foreignDataWrapperId: string, foreignDataWrapperOptions?: any | null, foreignDataWrapperType: string, updatedAt: any, schema?: string | null, label: string, userMappingOptions?: { __typename?: 'UserMappingOptionsUser', user?: string | null } | null } };

export type CreateOneObjectMetadataItemMutationVariables = Exact<{
  input: CreateOneObjectInput;
}>;


export type CreateOneObjectMetadataItemMutation = { __typename?: 'Mutation', createOneObject: { __typename?: 'object', id: any, dataSourceId: string, nameSingular: string, namePlural: string, labelSingular: string, labelPlural: string, description?: string | null, icon?: string | null, isCustom: boolean, isActive: boolean, createdAt: any, updatedAt: any, labelIdentifierFieldMetadataId?: string | null, imageIdentifierFieldMetadataId?: string | null } };

export type CreateOneFieldMetadataItemMutationVariables = Exact<{
  input: CreateOneFieldMetadataInput;
}>;


export type CreateOneFieldMetadataItemMutation = { __typename?: 'Mutation', createOneField: { __typename?: 'field', id: any, type: FieldMetadataType, name: string, label: string, description?: string | null, icon?: string | null, isCustom?: boolean | null, isActive?: boolean | null, isNullable?: boolean | null, createdAt: any, updatedAt: any, defaultValue?: any | null, options?: any | null } };

export type CreateOneRelationMetadataMutationVariables = Exact<{
  input: CreateOneRelationInput;
}>;


export type CreateOneRelationMetadataMutation = { __typename?: 'Mutation', createOneRelation: { __typename?: 'relation', id: any, relationType: RelationMetadataType, fromObjectMetadataId: string, toObjectMetadataId: string, fromFieldMetadataId: string, toFieldMetadataId: string, createdAt: any, updatedAt: any } };

export type UpdateOneFieldMetadataItemMutationVariables = Exact<{
  idToUpdate: Scalars['UUID']['input'];
  updatePayload: UpdateFieldInput;
}>;


export type UpdateOneFieldMetadataItemMutation = { __typename?: 'Mutation', updateOneField: { __typename?: 'field', id: any, type: FieldMetadataType, name: string, label: string, description?: string | null, icon?: string | null, isCustom?: boolean | null, isActive?: boolean | null, isNullable?: boolean | null, createdAt: any, updatedAt: any } };

export type UpdateOneObjectMetadataItemMutationVariables = Exact<{
  idToUpdate: Scalars['UUID']['input'];
  updatePayload: UpdateObjectPayload;
}>;


export type UpdateOneObjectMetadataItemMutation = { __typename?: 'Mutation', updateOneObject: { __typename?: 'object', id: any, dataSourceId: string, nameSingular: string, namePlural: string, labelSingular: string, labelPlural: string, description?: string | null, icon?: string | null, isCustom: boolean, isActive: boolean, createdAt: any, updatedAt: any, labelIdentifierFieldMetadataId?: string | null, imageIdentifierFieldMetadataId?: string | null } };

export type DeleteOneObjectMetadataItemMutationVariables = Exact<{
  idToDelete: Scalars['UUID']['input'];
}>;


export type DeleteOneObjectMetadataItemMutation = { __typename?: 'Mutation', deleteOneObject: { __typename?: 'object', id: any, dataSourceId: string, nameSingular: string, namePlural: string, labelSingular: string, labelPlural: string, description?: string | null, icon?: string | null, isCustom: boolean, isActive: boolean, createdAt: any, updatedAt: any, labelIdentifierFieldMetadataId?: string | null, imageIdentifierFieldMetadataId?: string | null } };

export type DeleteOneFieldMetadataItemMutationVariables = Exact<{
  idToDelete: Scalars['UUID']['input'];
}>;


export type DeleteOneFieldMetadataItemMutation = { __typename?: 'Mutation', deleteOneField: { __typename?: 'field', id: any, type: FieldMetadataType, name: string, label: string, description?: string | null, icon?: string | null, isCustom?: boolean | null, isActive?: boolean | null, isNullable?: boolean | null, createdAt: any, updatedAt: any } };

export type DeleteOneRelationMetadataItemMutationVariables = Exact<{
  idToDelete: Scalars['UUID']['input'];
}>;


export type DeleteOneRelationMetadataItemMutation = { __typename?: 'Mutation', deleteOneRelation: { __typename?: 'relation', id: any } };

export type ObjectMetadataItemsQueryVariables = Exact<{
  objectFilter?: InputMaybe<ObjectFilter>;
  fieldFilter?: InputMaybe<FieldFilter>;
}>;


export type ObjectMetadataItemsQuery = { __typename?: 'Query', objects: { __typename?: 'ObjectConnection', edges: Array<{ __typename?: 'objectEdge', node: { __typename?: 'object', id: any, dataSourceId: string, nameSingular: string, namePlural: string, labelSingular: string, labelPlural: string, description?: string | null, icon?: string | null, isCustom: boolean, isRemote: boolean, isActive: boolean, isSystem: boolean, createdAt: any, updatedAt: any, labelIdentifierFieldMetadataId?: string | null, imageIdentifierFieldMetadataId?: string | null, fields: { __typename?: 'ObjectFieldsConnection', edges: Array<{ __typename?: 'fieldEdge', node: { __typename?: 'field', id: any, type: FieldMetadataType, name: string, label: string, description?: string | null, icon?: string | null, isCustom?: boolean | null, isActive?: boolean | null, isSystem?: boolean | null, isNullable?: boolean | null, createdAt: any, updatedAt: any, defaultValue?: any | null, options?: any | null, fromRelationMetadata?: { __typename?: 'relation', id: any, relationType: RelationMetadataType, toFieldMetadataId: string, toObjectMetadata: { __typename?: 'object', id: any, dataSourceId: string, nameSingular: string, namePlural: string, isSystem: boolean, isRemote: boolean } } | null, toRelationMetadata?: { __typename?: 'relation', id: any, relationType: RelationMetadataType, fromFieldMetadataId: string, fromObjectMetadata: { __typename?: 'object', id: any, dataSourceId: string, nameSingular: string, namePlural: string, isSystem: boolean, isRemote: boolean } } | null, relationDefinition?: { __typename?: 'RelationDefinition', relationId: any, direction: RelationDefinitionType, sourceObjectMetadata: { __typename?: 'object', id: any, nameSingular: string, namePlural: string }, sourceFieldMetadata: { __typename?: 'field', id: any, name: string }, targetObjectMetadata: { __typename?: 'object', id: any, nameSingular: string, namePlural: string }, targetFieldMetadata: { __typename?: 'field', id: any, name: string } } | null } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage?: boolean | null, hasPreviousPage?: boolean | null, startCursor?: any | null, endCursor?: any | null } } } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage?: boolean | null, hasPreviousPage?: boolean | null, startCursor?: any | null, endCursor?: any | null } } };

export const RemoteServerFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"RemoteServerFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RemoteServer"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"foreignDataWrapperId"}},{"kind":"Field","name":{"kind":"Name","value":"foreignDataWrapperOptions"}},{"kind":"Field","name":{"kind":"Name","value":"foreignDataWrapperType"}},{"kind":"Field","name":{"kind":"Name","value":"userMappingOptions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"}}]}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"schema"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}}]} as unknown as DocumentNode<RemoteServerFieldsFragment, unknown>;
export const RemoteTableFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"RemoteTableFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RemoteTable"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"schema"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"schemaPendingUpdates"}}]}}]} as unknown as DocumentNode<RemoteTableFieldsFragment, unknown>;
export const CreateServerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createServer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateRemoteServerInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createOneRemoteServer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"RemoteServerFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"RemoteServerFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RemoteServer"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"foreignDataWrapperId"}},{"kind":"Field","name":{"kind":"Name","value":"foreignDataWrapperOptions"}},{"kind":"Field","name":{"kind":"Name","value":"foreignDataWrapperType"}},{"kind":"Field","name":{"kind":"Name","value":"userMappingOptions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"}}]}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"schema"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}}]} as unknown as DocumentNode<CreateServerMutation, CreateServerMutationVariables>;
export const DeleteServerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteServer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RemoteServerIdInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteOneRemoteServer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteServerMutation, DeleteServerMutationVariables>;
export const SyncRemoteTableDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"syncRemoteTable"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RemoteTableInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"syncRemoteTable"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"RemoteTableFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"RemoteTableFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RemoteTable"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"schema"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"schemaPendingUpdates"}}]}}]} as unknown as DocumentNode<SyncRemoteTableMutation, SyncRemoteTableMutationVariables>;
export const SyncRemoteTableSchemaChangesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"syncRemoteTableSchemaChanges"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RemoteTableInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"syncRemoteTableSchemaChanges"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"RemoteTableFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"RemoteTableFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RemoteTable"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"schema"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"schemaPendingUpdates"}}]}}]} as unknown as DocumentNode<SyncRemoteTableSchemaChangesMutation, SyncRemoteTableSchemaChangesMutationVariables>;
export const UnsyncRemoteTableDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"unsyncRemoteTable"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RemoteTableInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unsyncRemoteTable"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"RemoteTableFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"RemoteTableFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RemoteTable"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"schema"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"schemaPendingUpdates"}}]}}]} as unknown as DocumentNode<UnsyncRemoteTableMutation, UnsyncRemoteTableMutationVariables>;
export const UpdateServerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateServer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateRemoteServerInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateOneRemoteServer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"RemoteServerFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"RemoteServerFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RemoteServer"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"foreignDataWrapperId"}},{"kind":"Field","name":{"kind":"Name","value":"foreignDataWrapperOptions"}},{"kind":"Field","name":{"kind":"Name","value":"foreignDataWrapperType"}},{"kind":"Field","name":{"kind":"Name","value":"userMappingOptions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"}}]}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"schema"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}}]} as unknown as DocumentNode<UpdateServerMutation, UpdateServerMutationVariables>;
export const GetManyDatabaseConnectionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetManyDatabaseConnections"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RemoteServerTypeInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findManyRemoteServersByType"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"RemoteServerFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"RemoteServerFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RemoteServer"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"foreignDataWrapperId"}},{"kind":"Field","name":{"kind":"Name","value":"foreignDataWrapperOptions"}},{"kind":"Field","name":{"kind":"Name","value":"foreignDataWrapperType"}},{"kind":"Field","name":{"kind":"Name","value":"userMappingOptions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"}}]}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"schema"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}}]} as unknown as DocumentNode<GetManyDatabaseConnectionsQuery, GetManyDatabaseConnectionsQueryVariables>;
export const GetManyRemoteTablesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetManyRemoteTables"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FindManyRemoteTablesInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findDistantTablesWithStatus"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"RemoteTableFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"RemoteTableFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RemoteTable"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"schema"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"schemaPendingUpdates"}}]}}]} as unknown as DocumentNode<GetManyRemoteTablesQuery, GetManyRemoteTablesQueryVariables>;
export const GetOneDatabaseConnectionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetOneDatabaseConnection"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RemoteServerIdInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findOneRemoteServerById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"RemoteServerFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"RemoteServerFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RemoteServer"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"foreignDataWrapperId"}},{"kind":"Field","name":{"kind":"Name","value":"foreignDataWrapperOptions"}},{"kind":"Field","name":{"kind":"Name","value":"foreignDataWrapperType"}},{"kind":"Field","name":{"kind":"Name","value":"userMappingOptions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"}}]}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"schema"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}}]} as unknown as DocumentNode<GetOneDatabaseConnectionQuery, GetOneDatabaseConnectionQueryVariables>;
export const CreateOneObjectMetadataItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateOneObjectMetadataItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateOneObjectInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createOneObject"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"dataSourceId"}},{"kind":"Field","name":{"kind":"Name","value":"nameSingular"}},{"kind":"Field","name":{"kind":"Name","value":"namePlural"}},{"kind":"Field","name":{"kind":"Name","value":"labelSingular"}},{"kind":"Field","name":{"kind":"Name","value":"labelPlural"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"isCustom"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"labelIdentifierFieldMetadataId"}},{"kind":"Field","name":{"kind":"Name","value":"imageIdentifierFieldMetadataId"}}]}}]}}]} as unknown as DocumentNode<CreateOneObjectMetadataItemMutation, CreateOneObjectMetadataItemMutationVariables>;
export const CreateOneFieldMetadataItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateOneFieldMetadataItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateOneFieldMetadataInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createOneField"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"isCustom"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"isNullable"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"defaultValue"}},{"kind":"Field","name":{"kind":"Name","value":"options"}}]}}]}}]} as unknown as DocumentNode<CreateOneFieldMetadataItemMutation, CreateOneFieldMetadataItemMutationVariables>;
export const CreateOneRelationMetadataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateOneRelationMetadata"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateOneRelationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createOneRelation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"relationType"}},{"kind":"Field","name":{"kind":"Name","value":"fromObjectMetadataId"}},{"kind":"Field","name":{"kind":"Name","value":"toObjectMetadataId"}},{"kind":"Field","name":{"kind":"Name","value":"fromFieldMetadataId"}},{"kind":"Field","name":{"kind":"Name","value":"toFieldMetadataId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<CreateOneRelationMetadataMutation, CreateOneRelationMetadataMutationVariables>;
export const UpdateOneFieldMetadataItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateOneFieldMetadataItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"idToUpdate"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updatePayload"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateFieldInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateOneField"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"idToUpdate"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"update"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updatePayload"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"isCustom"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"isNullable"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<UpdateOneFieldMetadataItemMutation, UpdateOneFieldMetadataItemMutationVariables>;
export const UpdateOneObjectMetadataItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateOneObjectMetadataItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"idToUpdate"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updatePayload"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateObjectPayload"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateOneObject"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"idToUpdate"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"update"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updatePayload"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"dataSourceId"}},{"kind":"Field","name":{"kind":"Name","value":"nameSingular"}},{"kind":"Field","name":{"kind":"Name","value":"namePlural"}},{"kind":"Field","name":{"kind":"Name","value":"labelSingular"}},{"kind":"Field","name":{"kind":"Name","value":"labelPlural"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"isCustom"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"labelIdentifierFieldMetadataId"}},{"kind":"Field","name":{"kind":"Name","value":"imageIdentifierFieldMetadataId"}}]}}]}}]} as unknown as DocumentNode<UpdateOneObjectMetadataItemMutation, UpdateOneObjectMetadataItemMutationVariables>;
export const DeleteOneObjectMetadataItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteOneObjectMetadataItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"idToDelete"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteOneObject"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"idToDelete"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"dataSourceId"}},{"kind":"Field","name":{"kind":"Name","value":"nameSingular"}},{"kind":"Field","name":{"kind":"Name","value":"namePlural"}},{"kind":"Field","name":{"kind":"Name","value":"labelSingular"}},{"kind":"Field","name":{"kind":"Name","value":"labelPlural"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"isCustom"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"labelIdentifierFieldMetadataId"}},{"kind":"Field","name":{"kind":"Name","value":"imageIdentifierFieldMetadataId"}}]}}]}}]} as unknown as DocumentNode<DeleteOneObjectMetadataItemMutation, DeleteOneObjectMetadataItemMutationVariables>;
export const DeleteOneFieldMetadataItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteOneFieldMetadataItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"idToDelete"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteOneField"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"idToDelete"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"isCustom"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"isNullable"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<DeleteOneFieldMetadataItemMutation, DeleteOneFieldMetadataItemMutationVariables>;
export const DeleteOneRelationMetadataItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteOneRelationMetadataItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"idToDelete"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteOneRelation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"idToDelete"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteOneRelationMetadataItemMutation, DeleteOneRelationMetadataItemMutationVariables>;
export const ObjectMetadataItemsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ObjectMetadataItems"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"objectFilter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"objectFilter"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"fieldFilter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"fieldFilter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"objects"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"paging"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"1000"}}]}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"objectFilter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"dataSourceId"}},{"kind":"Field","name":{"kind":"Name","value":"nameSingular"}},{"kind":"Field","name":{"kind":"Name","value":"namePlural"}},{"kind":"Field","name":{"kind":"Name","value":"labelSingular"}},{"kind":"Field","name":{"kind":"Name","value":"labelPlural"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"isCustom"}},{"kind":"Field","name":{"kind":"Name","value":"isRemote"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"isSystem"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"labelIdentifierFieldMetadataId"}},{"kind":"Field","name":{"kind":"Name","value":"imageIdentifierFieldMetadataId"}},{"kind":"Field","name":{"kind":"Name","value":"fields"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"paging"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"1000"}}]}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"fieldFilter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"isCustom"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"isSystem"}},{"kind":"Field","name":{"kind":"Name","value":"isNullable"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"fromRelationMetadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"relationType"}},{"kind":"Field","name":{"kind":"Name","value":"toObjectMetadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"dataSourceId"}},{"kind":"Field","name":{"kind":"Name","value":"nameSingular"}},{"kind":"Field","name":{"kind":"Name","value":"namePlural"}},{"kind":"Field","name":{"kind":"Name","value":"isSystem"}},{"kind":"Field","name":{"kind":"Name","value":"isRemote"}}]}},{"kind":"Field","name":{"kind":"Name","value":"toFieldMetadataId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"toRelationMetadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"relationType"}},{"kind":"Field","name":{"kind":"Name","value":"fromObjectMetadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"dataSourceId"}},{"kind":"Field","name":{"kind":"Name","value":"nameSingular"}},{"kind":"Field","name":{"kind":"Name","value":"namePlural"}},{"kind":"Field","name":{"kind":"Name","value":"isSystem"}},{"kind":"Field","name":{"kind":"Name","value":"isRemote"}}]}},{"kind":"Field","name":{"kind":"Name","value":"fromFieldMetadataId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"defaultValue"}},{"kind":"Field","name":{"kind":"Name","value":"options"}},{"kind":"Field","name":{"kind":"Name","value":"relationDefinition"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"relationId"}},{"kind":"Field","name":{"kind":"Name","value":"direction"}},{"kind":"Field","name":{"kind":"Name","value":"sourceObjectMetadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"nameSingular"}},{"kind":"Field","name":{"kind":"Name","value":"namePlural"}}]}},{"kind":"Field","name":{"kind":"Name","value":"sourceFieldMetadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"targetObjectMetadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"nameSingular"}},{"kind":"Field","name":{"kind":"Name","value":"namePlural"}}]}},{"kind":"Field","name":{"kind":"Name","value":"targetFieldMetadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}},{"kind":"Field","name":{"kind":"Name","value":"startCursor"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}},{"kind":"Field","name":{"kind":"Name","value":"startCursor"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}}]}}]}}]}}]} as unknown as DocumentNode<ObjectMetadataItemsQuery, ObjectMetadataItemsQueryVariables>;