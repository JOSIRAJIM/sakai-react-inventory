import { useDirectus } from '../DirectusProvider'
import { useDirectusRequest } from '../hooks/useDirectusRequest';
import { Directus } from '@directus/sdk';

import { asyncWrapper } from './asyncWrapper';

export const asyncDirectus = async(fn)=>{
    const directus = new Directus('http://localhost:8055/')
    return await asyncWrapper(fn, directus)
}

// const executeDirectusAPI = async(fn, params=null)=>{
//     try{
//         const directus = new Directus('http://localhost:8055/')
//         const response = await fn(directus, params);
//         return [response, null]
//     }catch(error){
//         return [null, error]
//     }    
// }