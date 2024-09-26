// src/models/orgModel.ts
import { types } from "mobx-state-tree";

export const orgModel = types
  .model("Orgs", {
    id: types.identifierNumber,
    title: types.string,
    completed: types.boolean,
  })
  .actions((self) => ({
    toggle() {
      self.completed = !self.completed;
    },
  }));
  export const RootStore = types.model("RootStore", {
    orgs: types.array(orgModel),
  }).actions((self) => ({
    addOrg(title: string) {
      self.orgs.push({ id: Math.random(), title, completed: false });
    },
  }));

export const createStore = () => RootStore.create({ orgs: [] });