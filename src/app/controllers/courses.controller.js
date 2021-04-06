const Course = require("../models/course");
const { mongooseToObject } = require("../../ultis/mongoose");
class CoursesController {
  // [GET] form create
  create = (req, res, next) => {
    res.render("courses/create");
  };

  // [GET] /course/:slug
  show = (req, res, next) => {
    Course.findOne({ slug: req.params.slug })
      .then((course) => {
        res.render("courses/show", { course: mongooseToObject(course) });
      })
      .catch(next);
  };

  // [POST] create a course
  store = (req, res, next) => {
    const data = req.body;
    data.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
    const course = new Course(data);
    course
      .save()
      .then(() => res.redirect("/"))
      .catch(next);
  };
}

module.exports = new CoursesController();
