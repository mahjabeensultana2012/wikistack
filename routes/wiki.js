const router = require('express').Router();
const { addPage, editPage, main, userList, userPages, wikiPage } = require('../views');
const {Page, User} = require('../models');
//wiki
router.get('/', async(req,res,next) => {
  try{
    const pages = await Page.findAll();
    res.send(main(pages));

  }catch(error){
    next(error);
  }
})

router.post('/', async(req, res, next) =>{
  const page = new Page(req.body);
  try{
    const [user, wasCreated] = await User.findOrCreate({
      where:{
        name: req.body.name,
        email: req.body.email
      }
    })
    await page.save();
    page.setAuthor(user);
    res.redirect(`/wiki/${page.slug}`);
  }
  catch(error){
    next(error);
  }
})

//wiki/add
router.get('/add', (req, res, next) =>{
  res.send(addPage());
})

//wiki/:slug
router.get('/:slug',async(req,res,next)=>{
  try{
    const page = await Page.findOne({
      where:
      {
        slug: req.params.slug
      }
    });
    const author = await page.getAuthor();
    res.send(wikiPage(page, author));
  }
  catch(error){
    next(error);
  }

})



module.exports = router;
