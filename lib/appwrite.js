import { Alert } from "react-native";
import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
} from "react-native-appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.mohan.aora",
  projectId: "661bf35a4e4d5d4eec9c",
  databaseId: "661bf57a41ed9e2b4a01",
  userCollectionsId: "661bf5b2bbcb1101bceb",
  videoCollectionsId: "661bf5fbdb59fbe2c167",
  storageId: "661bf83e76d6075e7b58",
};

const client = new Client();

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

const account = new Account(client);
const avatar = new Avatars(client);
const database = new Databases(client);

export const createAccount = async (email, password, username) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw Error;
    const avaterUrl = avatar.getInitials(username);
    await signIn(email, password);

    const newUser = database.createDocument(
      config.databaseId,
      config.userCollectionsId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avaterUrl,
      }
    );
    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const signIn = async (email, password) => {
  try {
    const session = await account.createEmailSession(email, password);
    return session;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;

    const currentUser = await database.listDocuments(
      config.databaseId,
      config.userCollectionsId,
      [Query.equal("accountId", currentAccount.$id)]
    );
    if (!currentUser) throw Error;
    return currentUser;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
