const Blog = require('../models/Blog');

exports.insertBlog = async (req, res) => {
  try {
   const url = req.protocol + '://' + req.get('host')
    let newBlog = new Blog({
		    title: req.body.title,
	    	blog: req.body.blog,
		    comments: req.body.comments
	 });
    newBlog.img.data = url + '/images/' + req.file.filename;
	newBlog.save().then((blog) => {res.json(blog)})
			.catch((err) =>{res.status(404).json({error:err})})
  } catch (err) {
    console.log('error ------>: ' + error)
  }
};


exports.getBLog = async (req, res) => {
  try {
     await Blog.find()
	 					.then((blog) =>{res.json(blog)})
	 					.catch((err) =>{res.status(404).json({sucess:false})})
  } catch (err) {
    console.log('error ------>: ' + error)
  }
};

exports.UpdateBLog = async (req, res) => {
  console.log(req.params, req.body);
  try {
      await Blog.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, blog) {
            if (err) return res.status(500).send(err);
            res.status(200).send(blog);
        });
  } catch (err) {
    console.log('error ------>: ' + error)
  }
};


exports.DeleteBLog = async (req, res) => {
  console.log('delete', req.file)
  try {
      await Blog.findById(req.params.id)
		.then((blog) => {blog.remove().then(() => {res.json({sucess:true})})})
		.catch((err) =>{res.status(404).json({error:"Not deleted"})})

  } catch (err) {
    console.log('error ------>: ' + error)
  }
};

exports.getSingleBLog = async (req, res) => {
  try {
       await Blog.findById(req.params.id)
  .then(blog => {
  if(!blog) {
   return res.status(404).send({
   message: "Blog not found with id " + req.params.id
 });
}
res.send(blog);
  });


  } catch (err) {
    console.log('error ------>: ' + error)
  }
};
