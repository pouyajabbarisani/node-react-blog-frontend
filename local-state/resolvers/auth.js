
export const resolvers = {
   Mutation: {
      setAuth: (_root, args, { cache }) => {
         cache.writeData({
            data: {
               authStatus: {
                  isAuthenticated: true,
                  fullName: args.fullName,
                  username: args.username,
                  isManager: args.isManager,
                  __typename: 'authStatus'
               }
            }
         });
         return null;
      },
   }
}