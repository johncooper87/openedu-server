import { types as _ } from '@kemsu/graphql-server';
import { verifyAdminRole } from '@lib/authorization';

export default {
  type: _.NonNull(_.Int),
  args: {
    id: { type: _.NonNull(_.Int) }
  },
  async resolve(obj, { id }, { userId, db }) {
    await verifyAdminRole(userId, db);

    const { affectedRows } = await db.query(`UPDATE course_design_templates SET defunct = 1 WHERE id = ${id}`);
    return affectedRows;
  }
};