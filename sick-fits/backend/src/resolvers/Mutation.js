const Mutations = {
  async createItem(parent, args, ctx, info) {
    // TODO: check if they are logged in

    const item = await ctx.db.mutation.createItem(
      {
        data: {
          ...args
        }
      },
      info
    );

    console.log(item);
    return item;
  },
  updateItem(parent, args, ctx, info) {
    // first take a copy of t he updates
    const { id, ...rest } = args;
    // run the update method
    return ctx.db.mutation.updateItem(
      {
        data: rest,
        where: { id }
      },
      info
    );
  },
  async deleteItem(parent, args, ctx, info) {
    const where = { id: args.id };
    // find the item
    const item = await ctx.db.query.item(
      {
        where
      },
      `
      {
        id
        title
      }
      `
    );
    // TODO check if they own that item or have the permissions
    // delete it
    return ctx.db.mutation.deleteItem({ where }, info);
  }
};

module.exports = Mutations;
