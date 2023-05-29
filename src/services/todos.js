import api from "./api.js";

export default class TodoService {
    static async createItem(description) {
        try {
            const response = await api("/todo", {
                method: "POST",
                body: JSON.stringify({ description }),
            });
            return response;
        } catch (error) {
            throw new Error("Failed to create item");
        }
    }

    static async getById(id) {
        try {
            const response = await api(`/todo/${id}`, { method: "GET" });
            return response.data;
        } catch (error) {
            throw new Error(`Failed to get item with ID: ${id}`);
        }
    }

    static async getAll() {
        try {
            const response = await api("/todo");
            console.log(response);
            return response.data;
        } catch (error) {
            throw new Error("Failed to get all items");
        }
    }

    static async updateStatusById(id, completed) {
        try {
            const response = await api(`/todo/${id}`, {
                method: "PUT",
                body: JSON.stringify({ completed }),
            });
            return response;
        } catch (error) {
            throw new Error(`Failed to update status for item with ID: ${id}`);
        }
    }

    static async deleteById(id, attempts = 3) {
        try {
            return await api(`/todo/${id}`, { method: "DELETE" });
        } catch (error) {
            if (attempts > 1) {
                return TodoService.deleteById(id, attempts - 1);
            } else {
                throw new Error(`Failed to delete item with ID: ${id}`);
            }
        }
    }
}
