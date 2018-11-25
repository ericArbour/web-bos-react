const { forwardTo } = require("prisma-binding");
const { hasPermission } = require("../utils");

const Query = {
  items: forwardTo("db"),
  item: forwardTo("db"),
  itemsConnection: forwardTo("db"),
  me(parent, args, ctx, info) {
    // check if there is a current user Id
    if (!ctx.request.userId) return null;
    return ctx.db.query.user(
      {
        where: { id: ctx.request.userId }
      },
      info
    );
  },
  async users(parent, args, ctx, info) {
    // check if they are logged in
    if (!ctx.request.userId) {
      throw new Error("You must be logged in!");
    }
    // check if the user has the permissions to query all the users
    hasPermission(ctx.request.user, ["ADMIN", "PERMISSIONUPDATE"]);
    // if they do, query all the users
    return await ctx.db.query.users({}, info);
  },
  async order(parent, args, ctx, info) {
    // make sure they are logged in
    if (!ctx.request.userId) {
      throw new Error("You are not logged in");
    }
    // query the current order
    const order = await ctx.db.query.order(
      {
        where: { id: args.id }
      },
      info
    );
    // check if they have the permissions to see this order
    const ownsOrder = order.user.id === ctx.request.userId;
    const hasPermissiontoSeeOrder = ctx.request.user.permissions.includes(
      "ADMIN"
    );
    if (!ownsOrder || !hasPermissiontoSeeOrder)
      throw new Error("You cannot see this order");
    // return the order
    return order;
  },
  async orders(parent, args, ctx, info) {
    const { userId } = ctx.request;
    if (!userId) throw new Error("You are not logged in");
    return ctx.db.query.orders(
      {
        where: {
          user: { id: userId }
        }
      },
      info
    );
  }
};

module.exports = Query;
