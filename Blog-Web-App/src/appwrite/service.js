import config from "../config/config";
import { Client, ID, Storage, TablesDB, Query } from "appwrite";

export class Service{

    client = new Client();
    TablesDB;
    storage;

    constructor(){
        this.client
        .setEndpoint(config.appwriteUrl)
        .setProject(config.appwriteProjectId);

        this.tableDB = new TablesDB(this.client);
        this.storage = new Storage(this.client);
    }

    async createPost({title,content,image,status,userid}){

        try {
            return await this.tableDB.createRow({
                databaseId: config.appwriteDatabaseId,
                tableId: config.appwriteTableId,
                rowId: ID.unique(),
                data: {
                    title,
                    content,
                    image,
                    status,
                    userid,
                }

            });
        } catch (error) {
            console.log("Create post Error: ",error);
        }
    }

    async updatePost(ID, {title,content,image,status}){

        try {
            return await this.tableDB.updateRow({
                databaseId: config.appwriteDatabaseId,
                tableId: config.appwriteTableId,
                rowId: ID.unique(),
                data: {
                    title,
                    content,
                    image,
                    status,
                }
            });    
        } catch (error) {   
            console.log("Update post Error: ",error);
        }
    }

    async deletePost(ID){
        
        try {
            await this.tableDB.deleteRow({
                databaseId: config.appwriteDatabaseId,
                tableId: config.appwriteTableId,
                rowId: ID.unique(),
            }); 
            return true;
        } catch (error) {
            console.log("Delete post Error: ",error);
            return false;
        }
    }

    async getPost(ID){

        try {
            
            return await this.tableDB.getRow({
                databaseId: config.appwriteDatabaseId,
                tableId: config.appwriteTableId,
                rowId: ID.unique(),
            });
        } catch (error) {
            console.log("Get post Error: ",error);
            return false;
        }
    }

    async getPosts(queries = [Query.equal("status","active")]){
        try {
            return await this.tableDB.getPosts({
                databaseId: config.appwriteDatabaseId,
                tableId: config.appwriteTableId,
                queries,
                
            });
        } catch (error) {
            console.log("get all post Error: ",error);
            return false;
        }
    }

    async uploadFile(file){
        try {
            return this.storage.createFile({
                 bucketIdId: config.appwriteBucketId,
                 fileId: ID.unique(),
                 file: file,
            });
        } catch (error) {
            console.log("Upload image Error: ",error);
            return false;
        }
    }

    async deleteFile(fileId){
        try {
            return await this.storage.deleteFile({
                 bucketIdId: config.appwriteBucketId,
                 fileId: fileId,
            });
        } catch (error) {
            console.log("Delete image Error: ",error);
            return false;
        }
    }

    getFilePreview(fileId){
        try {
            return this.storage.getFilePreview({
                bucketIdId: config.appwriteBucketId,
                 fileId: fileId,
            });
        } catch (error) {
            console.log("image preview  Error: ",error);
            return false;
        }
    }
}
const service = new Service();

export default service; 