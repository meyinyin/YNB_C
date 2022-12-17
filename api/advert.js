import fly from './http'
import {HttpRequest_,outPut} from '../common/httpRequest.js'



export async function getAdvert(data) {
	return outPut(await HttpRequest_.get('bbtask/lookadvertlist',data))
}

export async function getAdvertDetile(gid) {
	return outPut(await HttpRequest_.get('bbtask/lookadvertdetail',{gid}))
}


export async function toSeeAdvert(nid,userid) {
	return outPut(await HttpRequest_.get('bbtask/lookadvertprofitlist',{nid,userid}))
}