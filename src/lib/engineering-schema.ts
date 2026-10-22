import { fields } from '@keystatic/core';
import { videoInputPattern } from './video.mjs';
const text = (label: string) => fields.text({label});
const required = (label: string) => fields.text({label,validation:{isRequired:true}});
export const engineeringFields = {
  platforms: fields.array(fields.object({name:required('平台名称 / 型号'),description:text('说明（如主控、开发板、操作系统）')}),{label:'硬件平台（自由添加，可拖动排序）',itemLabel:p=>p.fields.name.value}),
  hardware: fields.array(fields.object({name:required('器件 / 模块名称'),model:text('型号 / 规格'),quantity:fields.integer({label:'数量',defaultValue:1,validation:{min:1,isRequired:true}}),purpose:text('用途 / 接口'),notes:fields.text({label:'备注',multiline:true}),url:fields.url({label:'资料 / 产品链接（可选）'})}),{label:'硬件清单（自由添加，可拖动排序）',itemLabel:p=>p.fields.name.value}),
  responsibilities: fields.text({label:'我的职责与贡献',multiline:true}),
  diagrams: fields.array(fields.object({title:required('图名'),image:fields.image({label:'系统框图 / 原理图 / 实物图',directory:'public/images/projects',publicPath:'/images/projects/',validation:{isRequired:true}}),caption:fields.text({label:'图片说明',multiline:true})}),{label:'系统架构与图片（可添加多张）',itemLabel:p=>p.fields.title.value}),
  testResults: fields.array(fields.object({metric:required('测试项 / 指标'),result:required('实测结果'),conditions:fields.text({label:'测试条件与方法',multiline:true}),evidence:fields.url({label:'测试报告 / 证据链接（可选）'})}),{label:'测试结果（自由添加）',itemLabel:p=>p.fields.metric.value}),
  videos: fields.array(fields.object({title:required('视频标题'),input:fields.text({label:'YouTube / 哔哩哔哩地址或 iframe 外嵌代码',description:'支持普通视频链接、YouTube 分享 / Shorts 链接，以及两平台 iframe 代码。B站 b23.tv 短链接请先在浏览器打开，再复制完整视频地址。',multiline:true,validation:{isRequired:true,pattern:{regex:videoInputPattern,message:'请填写有效的 YouTube / B站完整视频地址，或包含该播放器地址的 iframe 代码。'}}}),caption:fields.text({label:'视频说明',multiline:true})}),{label:'演示视频（可添加多个）',itemLabel:p=>p.fields.title.value})
};
