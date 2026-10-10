import config from "../config/config";
import { Client, ID, Storage, TablesDB, Query } from "appwrite";

export class Service {
  client = new Client();
  tableDB;
  storage;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);

    this.tableDB = new TablesDB(this.client);
    this.storage = new Storage(this.client);
  }

  async createPost({ title, slug, content, image, status, userid }) {
    try {
      return await this.tableDB.createRow({
        databaseId: config.appwriteDatabaseId,
        tableId: config.appwriteTableId,
        rowId: ID.unique(),
        data: {
          title,
          slug: slug || title?.trim().toLowerCase().replace(/[^a-zA-Z0-9-]/g, "-") || "post",
          content,
          image,
          status,
          userid,
        },
      });
    } catch (error) {
      console.log("Create post Error: ", error);
    }
  }

  async updatePost(id, { title, slug, content, image, status }) {
    try {
      const data = {
        title,
        content,
        image,
        status,
      };
      if (slug) data.slug = slug;

      return await this.tableDB.updateRow({
        databaseId: config.appwriteDatabaseId,
        tableId: config.appwriteTableId,
        rowId: id,
        data,
      });
    } catch (error) {
      console.log("Update post Error: ", error);
    }
  }

  async deletePost(id) {
    try {
      await this.tableDB.deleteRow({
        databaseId: config.appwriteDatabaseId,
        tableId: config.appwriteTableId,
        rowId: id,
      });
      return true;
    } catch (error) {
      console.log("Delete post Error: ", error);
      return false;
    }
  }

  async getPost(id) {
    try {
      return await this.tableDB.getRow({
        databaseId: config.appwriteDatabaseId,
        tableId: config.appwriteTableId,
        rowId: id,
      });
    } catch (error) {
      console.log("Get post Error: ", error);
      return false;
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.tableDB.listRows({
        databaseId: config.appwriteDatabaseId,
        tableId: config.appwriteTableId,
        queries,
      });
    } catch (error) {
      console.log("get all post Error: ", error);
      return false;
    }
  }

  async uploadFile(file) {
    try {
      return await this.storage.createFile({
        bucketId: config.appwriteBucketId,
        fileId: ID.unique(),
        file: file,
      });
    } catch (error) {
      console.log("Upload image Error: ", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      return await this.storage.deleteFile({
        bucketId: config.appwriteBucketId,
        fileId: fileId,
      });
    } catch (error) {
      console.log("Delete image Error: ", error);
      return false;
    }
  }

  getFilePreview(fileId) {
    try {
      return this.storage.getFilePreview({
        bucketId: config.appwriteBucketId,
        fileId: fileId,
      });
    } catch (error) {
      console.log("image preview  Error: ", error);
      return false;
    }
  }
}
const service = new Service();

export default service;
