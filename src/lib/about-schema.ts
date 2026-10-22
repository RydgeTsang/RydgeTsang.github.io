import { fields, singleton } from '@keystatic/core';
const text = (label: string) => fields.text({ label });
const paragraph = (label: string) => fields.text({ label, multiline: true });
export const about = singleton({
  label: '关于我 About Me',
  path: 'src/content/about',
  format: { data: 'json' },
  schema: {
    heading: text('页面标题'), headingAccent: text('标题强调文字'), intro: paragraph('页面简介'),
    name: fields.text({label:'姓名',validation:{isRequired:true}}), role: text('职业 / 身份'),
    avatar: fields.image({label:'上传头像（优先显示）',directory:'public/images/about',publicPath:'/images/about/'}),
    avatarUrl: fields.url({label:'头像网址（未上传时使用）'}),
    bio: fields.markdoc({label:'个人介绍',options:{image:{directory:'public/images/about',publicPath:'/images/about/'}}}),
    contactHeading: text('联系信息标题'), email: text('公开邮箱'), location: text('公开所在地'),
    websiteLabel: text('网站显示文字'), websiteUrl: fields.url({label:'网站地址'}),
    skillsHeading: text('技能区标题'),
    skills: fields.array(fields.object({title:text('技能分组名称'),items:fields.array(fields.object({name:fields.text({label:'技能名称',validation:{isRequired:true}}),level:fields.integer({label:'熟练度（0–100）',defaultValue:50,validation:{min:0,max:100,isRequired:true}})}),{label:'技能列表',itemLabel:p=>p.fields.name.value})}),{label:'技能分组（可拖动排序）',itemLabel:p=>p.fields.title.value}),
    journeyHeading: text('经历区标题'),
    journey: fields.array(fields.object({title:text('职位 / 经历名称'),period:text('机构和时间'),description:paragraph('经历说明')}),{label:'经历（可拖动排序）',itemLabel:p=>p.fields.title.value}),
    updatesHeading: text('动态区标题'),
    updates: fields.array(fields.object({title:text('动态标题'),category:text('类别'),dateLabel:text('日期文字'),description:paragraph('动态内容'),link:fields.text({label:'链接（https:// 或站内 / 路径）',validation:{pattern:{regex:/^(https?:\/\/[^\s]+|\/(?!\/)[^\s]*)?$/,message:'请填写完整 http(s) 地址或以 / 开头的站内路径'}}}),linkLabel:text('链接按钮文字')}),{label:'动态（可拖动排序）',itemLabel:p=>p.fields.title.value})
  }
});
