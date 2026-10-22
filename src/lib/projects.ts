import { createReader } from '@keystatic/core/reader';
import config from '../../keystatic.config';
export const reader = createReader(process.cwd(),config);
export async function projects(){return (await reader.collections.projects.all()).filter(p=>p.entry.status==='published').sort((a,b)=>(a.entry.order??0)-(b.entry.order??0)||(b.entry.date??'').localeCompare(a.entry.date??''));}
