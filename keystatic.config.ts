import { about } from './src/lib/about-schema';
import { config, fields, collection } from '@keystatic/core';
import { categories } from './src/lib/categories';
export default config({storage:{kind:'local'},singletons:{about},collections:{projects:collection({label:'项目 Projects',slugField:'title',path:'src/content/projects/*',format:{data:'json'},schema:{
 title:fields.slug({name:{label:'项目名称',validation:{isRequired:true}}}),
 summary:fields.text({label:'简短介绍',multiline:true,validation:{isRequired:true}}),
 category:fields.select({label:'分类',options:categories,defaultValue:'app'}),
 date:fields.date({label:'项目日期',validation:{isRequired:true}}),
 tags:fields.array(fields.text({label:'标签'}),{label:'技术标签',itemLabel:p=>p.value}),
 cover:fields.image({label:'封面',directory:'public/images/projects',publicPath:'/images/projects/'}),
 body:fields.markdoc({label:'项目正文',options:{image:{directory:'public/images/projects',publicPath:'/images/projects/'}}}),
 source:fields.url({label:'源码链接'}),demo:fields.url({label:'演示链接'}),docs:fields.url({label:'文档链接'}),
 status:fields.select({label:'发布状态',options:[{label:'草稿',value:'draft'},{label:'发布',value:'published'}],defaultValue:'draft'}),
 order:fields.integer({label:'排序（越小越靠前）',defaultValue:0}),featured:fields.checkbox({label:'首页推荐',defaultValue:false})
}})}});
