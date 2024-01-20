import { UserCreationEntity, UserCreationFieldsEntity, UserEntity, UserRoles, z } from "@thechamomileclub/api";
import { XataClient } from "@thechamomileclub/database";

export const UserService = (serviceConfig: UserServiceConfig) => {
  const { xataClient: { db } } = serviceConfig;

  return {
    createAndInviteNewMembers: async (entries: UserCreationFieldsEntity[]) => {
      const usersToCreate: UserCreationEntity[] = entries.map((entry) => ({
        forename: entry.forename,
        surname: entry.surname,
        email: entry.email,
        description: entry.description,
        // if role is not explicitly set then prospective member by default
        roles: entry.roles || [UserRoles.PROSPECT],
        active: false,
        public: true,
        createdAt: new Date(),
      }));

      const validatedEntries = z.array(UserCreationEntity).parse(usersToCreate);

      const newUsers = db.users.create(validatedEntries);

      return z.array(UserEntity).parse(newUsers);
    },
  };
};

export type UserService = ReturnType<typeof UserService>;

export type UserServiceConfig = {
  xataClient: XataClient;
};