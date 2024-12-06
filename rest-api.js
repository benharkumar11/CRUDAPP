const API_URL = "https://crudapp-mn37.onrender.com";
const itemList = document.getElementById("item-list");
const newItemInput = document.getElementById("new-item");
 
// Fetch and display the items
async function fetchItems() {
    try {
        const response = await fetch(API_URL);
        const items = await response.json();
        renderItems(items);
    } catch (error) {
        console.error("Error fetching items:", error);
    }
}
 
// Render items to the DOM
function renderItems(items) {
    itemList.innerHTML = "";
    items.forEach((item) => {
        const listItem = document.createElement("li");
        listItem.innerHTML =`
                <span>${item.text}</span>
                <div>
                    <button onclick="editItem(${item.id}, '${item.text}')">EDIT</button>
                    <button onclick="deleteItem(${item.id})">DELETE</button>
                </div>
            `;
        itemList.appendChild(listItem);
    });
}
 
// Create a new item
async function createItem() {
    const text = newItemInput.value.trim();
    if (!text) return;
 
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({text}),
        });
        const newItem = await response.json();
        fetchItems(); // Refresh the List
        newItemInput.value = "";
    } catch (error) {
        console.error("Error creating item:", error);
    }
}
 
//Edit an Item
function editItem(id, currentText) {
    const newText = prompt("Edit items:", currentText);
    if (newText !== null && newText.trim()) {
        updateItem(id, newText);
    }
}
 
// Update an Item
async function updateItem(id, text) {
    try {
        await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text }),
        });
        fetchItems(); //Refrsh the list
    } catch(error) {
        console.error("Error updating item:", error);
    }
}
 
// Delete an Item
async function deleteItem(id) {
    try {
        await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        fetchItems(); // refresh the list
    } catch {
        console.error("Error deleting item:", error);
    }
}
 
// Initalize the app
fetchItems();