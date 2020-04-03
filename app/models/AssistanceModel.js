/* eslint-disable require-jsdoc */

const dbHelper = require("../helpers/dbHelper");
const db = new dbHelper();


module.exports = class {
  /**
   * @static 
   * @returns {[assistances]} List of all assistances  
   */

  static async getAll(limit, offset, avaliable) {
    db.select().from("assistance").
      orderBy("assistance_id", "DESC");

    if (avaliable != undefined) {
      db.where("assistance_avaliable", avaliable ? true : "");
    }

    if (limit != undefined && offset != undefined)
      db.pagination(limit, offset);

    db.
      join("assistance_owner_id", "user.user_id").
      join("assistance.assistance_course_id", "course.course_id").
      join("assistance_local_id", "address.address_id");


    const rowsAndInfos = await db.resolve();
    const assistances = [...rowsAndInfos];

    return assistances;
  }

  /**
   * @static
   * @param {*} idAssistance
   * @returns {assistance} returns an assistance 
   */
  static async getByID(id) {
    const assistance = await db.
      select(`
        a.*,
        tag.tag_name, 
        tag.tag_description,
        tag.tag_created_at,
        user.user_id,
        user.user_full_name,
        user.user_created_at,
        user.user_is_assistant,
        user.user_cpf,
        user.user_matricula,
        user.user_idUFFS,
        user.user_assistant_stars,
        user.user_student_starts,
        user.user_email,
        user.user_phone_number,
        user.user_verified_assistant,
        course.*,
        address.*`,).
      from("assistance as a").
      where("assistance_id", id, '=').
      join("a.assistance_owner_id", "user.user_id").
      join("user.user_course_id", "course.course_id").
      join("assistance_local_id", "address.address_id").

      resolve();

    /**
     * tratar dados
     */

    return assistance[0];
  };

};
