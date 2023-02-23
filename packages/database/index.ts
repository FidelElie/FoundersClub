// Generated by Xata Codegen 0.21.0. Please do not edit.
import { buildClient } from "@xata.io/client";
import type {
  BaseClientOptions,
  SchemaInference,
  XataRecord,
} from "@xata.io/client";

const tables = [
  {
    name: "User",
    columns: [
      { name: "forename", type: "string", notNull: true, defaultValue: "" },
      { name: "description", type: "text" },
      { name: "created_at", type: "datetime" },
      { name: "updated_at", type: "datetime" },
      { name: "active", type: "bool", notNull: true, defaultValue: "false" },
      { name: "deleted", type: "bool", notNull: true, defaultValue: "false" },
      { name: "surname", type: "string" },
      { name: "nickname", type: "string" },
      { name: "position", type: "string" },
      { name: "email", type: "email", unique: true },
    ],
  },
  {
    name: "Role",
    columns: [
      { name: "name", type: "string", notNull: true, defaultValue: "" },
      { name: "description", type: "text", notNull: true, defaultValue: "" },
    ],
  },
  {
    name: "UserRole",
    columns: [
      { name: "user", type: "link", link: { table: "User" }, unique: true },
      { name: "role", type: "link", link: { table: "Role" }, unique: true },
    ],
  },
  {
    name: "Key",
    columns: [
      { name: "challenge", type: "string" },
      { name: "created_at", type: "datetime" },
      { name: "token", type: "string", notNull: true, defaultValue: "" },
      { name: "user", type: "link", link: { table: "User" } },
    ],
  },
] as const;

export type SchemaTables = typeof tables;
export type InferredTypes = SchemaInference<SchemaTables>;

export type User = InferredTypes["User"];
export type UserRecord = User & XataRecord;

export type Role = InferredTypes["Role"];
export type RoleRecord = Role & XataRecord;

export type UserRole = InferredTypes["UserRole"];
export type UserRoleRecord = UserRole & XataRecord;

export type Key = InferredTypes["Key"];
export type KeyRecord = Key & XataRecord;

export type DatabaseSchema = {
  User: UserRecord;
  Role: RoleRecord;
  UserRole: UserRoleRecord;
  Key: KeyRecord;
};

const DatabaseClient = buildClient();

const defaultOptions = {
  databaseURL:
    "https://Fidel-Elie-s-workspace-tp1678.eu-west-1.xata.sh/db/chamomileclub",
};

export class XataClient extends DatabaseClient<DatabaseSchema> {
  constructor(options?: BaseClientOptions) {
    super({ ...defaultOptions, ...options }, tables);
  }
}

let instance: XataClient | undefined = undefined;

export const getXataClient = () => {
  if (instance) return instance;

  instance = new XataClient();
  return instance;
};
