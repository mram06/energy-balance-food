import firebaseDB from "@/firebase-config";
import {
  doc,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  query,
  where,
  setDoc,
  getDoc,
  arrayUnion,
} from "firebase/firestore/lite";

class DbOperations {
  constructor(collectionTitle) {
    this.dbCollection = collection(firebaseDB, `/${collectionTitle}`);
  }
  getListFromSnapshot(snapshot) {
    const list = [];
    snapshot.docs.forEach((doc) => {
      list.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    return list;
  }

  loadItemsList() {
    return new Promise((resolve, reject) => {
      getDocs(this.dbCollection)
        .then((querySnapshot) => {
          resolve(this.getListFromSnapshot(querySnapshot));
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  addItem(item) {
    return new Promise((resolve, reject) => {
      addDoc(this.dbCollection, item)
        .then(() => {
          resolve(true);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  deleteItem(id) {
    return new Promise((resolve, reject) => {
      deleteDoc(doc(this.dbCollection, id))
        .then(() => {
          resolve(true);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  getItemById(itemId) {
    return new Promise((resolve, reject) => {
      const docRef = doc(this.dbCollection, itemId);
      getDoc(docRef)
        .then((docSnap) => {
          if (docSnap.exists()) resolve(docSnap.data());
          else resolve({});
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  updateItem(itemId, data) {
    return new Promise((resolve, reject) => {
      const oldDocRef = doc(this.dbCollection, itemId);
      updateDoc(oldDocRef, data)
        .then(() => {
          resolve(true);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  loadFilteredData(fieldTitle, compareOperator, valueToCompare) {
    const q = query(
      this.dbCollection,
      where(fieldTitle, compareOperator, valueToCompare)
    );
    return new Promise((resolve, reject) => {
      getDocs(q)
        .then((querySnapshot) => {
          resolve(this.getListFromSnapshot(querySnapshot));
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  addItemWithCustomId(id, item) {
    return new Promise((resolve, reject) => {
      setDoc(doc(this.dbCollection, id), item)
        .then(() => {
          resolve(true);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  addItemToArray(id, arrayProperty, value) {
    return new Promise((resolve, reject) => {
      this.getItemById(id).then((item) => {
        let addedCount = false;
        if (item.items) {
          const currentArray = item.items.map((item) => {
            if (item.itemId === value) {
              item.count += 1;
              addedCount = true;
            }
            return item;
          });
          if (!addedCount) currentArray.push({ itemId: value, count: 1 });
          updateDoc(doc(this.dbCollection, id), {
            [arrayProperty]: currentArray,
          })
            .then(() => {
              resolve(true);
            })
            .catch((error) => {
              reject(error);
            });
        } else {
          this.addItemWithCustomId(id, {
            [arrayProperty]: [
              {
                itemId: value,
                count: 1,
              },
            ],
          })
            .then(() => {
              resolve(true);
            })
            .catch((error) => {
              reject(error);
            });
        }
      });
    });
  }
  deleteItemFromArray(id, arrayProperty, value) {
    return new Promise((resolve, reject) => {
      this.getItemById(id).then((item) => {
        if (item.items) {
          let itemToDelete;
          let currentArray = item.items.map((item) => {
            if (item.itemId === value) {
              if (item.count > 1) item.count -= 1;
              else itemToDelete = item.itemId;
            }
            return item;
          });
          if (itemToDelete)
            currentArray = currentArray.filter(
              (item) => item.itemId !== itemToDelete
            );

          updateDoc(doc(this.dbCollection, id), {
            [arrayProperty]: currentArray,
          })
            .then(() => {
              resolve(true);
            })
            .catch((error) => {
              reject(error);
            });
        }
      });
    });
  }

  addOrderToArray(id, arrayProperty, value) {
    return new Promise((resolve, reject) => {
      this.getItemById(id).then((item) => {
        if (item.ordersList) {
          updateDoc(doc(this.dbCollection, id), {
            [arrayProperty]: arrayUnion(value),
          })
            .then(() => {
              resolve(true);
            })
            .catch((error) => {
              reject(error);
            });
        } else {
          this.addItemWithCustomId(id, {
            [arrayProperty]: [value],
          })
            .then(() => {
              resolve(true);
            })
            .catch((error) => {
              reject(error);
            });
        }
      });
    });
  }
}

export default DbOperations;
