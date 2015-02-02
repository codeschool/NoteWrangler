var Comment = sequelize.define('comment')
var Commentable = Sequelize.polymorphic('commentable', {

})
Comment.belongsTo(Commentable)
// or
var Commentable = Comment.polymorphic('commentable', {
	'type_column': 'commentable_type',
	'key_column': 'commentable_id',
	as: 'Parent'
})

Question.hasMany(Commentable) //type = question by defualt
Question.hasMany(Commentable, {
	as: 'Answer'
	type: 'answer'
})

Question.findAll({
	include: [
		Commentable,
		{model: Commentable, as: 'Answer'}
	]
})
ForumPost.hasMany(Commentable)