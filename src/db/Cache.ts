import { HumanMessage, AIMessage } from "@langchain/core/messages";

declare global{
    var instance:Cache;
}

export class Cache{

    //Create an inMemory Store for storing the chain
    //Create another inMemory Store for the conversations
    //Create an instance for the class to make it singleton

    //TODO : make the types strict for chaincache and convocache

    static instance : Cache;
    private chainCache : Map<string,any>;
    private convoCache : Map<string,any>;
    
    private constructor(){
        this.chainCache = new Map();
        this.convoCache = new Map();
        console.log("Cache Initialized !");
    }

    static getInstance(){
        if(!Cache.instance){
            
            if(process.env.NODE_ENV==='development'){
                
                if(!globalThis.instance){
                    Cache.instance = new Cache();
                    globalThis.instance = Cache.instance;
                    console.log("No global instance , So Created a New Instance !!")
                }

                return globalThis.instance;
            }
            else{
                Cache.instance = new Cache();
            }

        }
        return Cache.instance;
    }

    // set, get and delete methods for chainCache

    setChain(key:string, value:any){
        this.chainCache.set(key,value);
        console.log(`Chain saved locally for this ${key}`);
        return this.getChain(key);
    }

    getChain(key:string){
        console.log(this.chainCache.values);
        return this.chainCache.get(key);
    }

    removeChain(key:string){
        const isChainPresent = this.chainCache.delete(key);
        if(!isChainPresent){
            return {message:"No such chain found to delete !"};
        }
        return {message:"Chain removed successfully from the Cache !"}
    }

    // get and delete methods for convoArrCache

    getConvoArr(key:string){

        let convoArr = this.convoCache.get(key);
        if(!convoArr){
            convoArr = this.convoCache.set(key,[]);
        }

        return convoArr;
    }

    updateConvoArr(key:string,HUMAN_MESSAGE:HumanMessage,AI_MESSAGE:AIMessage){
        let convoArr = this.getConvoArr(key);
        convoArr.push(HUMAN_MESSAGE);
        convoArr.push(AI_MESSAGE);
    }

    removeConvoArr(key:string){
        const isDeleted = this.convoCache.delete(key);
        if(!isDeleted){
            console.log("The given convoArr is not present, So not Deleted !!");
            return {message:"No such convoArr found to delete !"};
        }
        return {message:"ConvoArr removed successfully from the Cache !"};
    }   
}