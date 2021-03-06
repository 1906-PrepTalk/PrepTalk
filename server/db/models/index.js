const User = require('./user')
const Video = require('./video')
const Transcript = require('./transcript')
const Report = require('./report')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */
Video.belongsTo(User)
User.hasMany(Video)

Transcript.belongsTo(Video)
Report.belongsTo(Video)

Report.belongsTo(Transcript)

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 
 */
module.exports = {
  User,
  Video,
  Transcript,
  Report
}
