import { ResponseHelper } from "../helpers/response.js";
import * as menuItemsService from "../services/menuItemsService.js";


export const getMenuItems = async () => {
    try {
        return await menuItemsService.getMenuItems();
    } catch (error) {
        return ResponseHelper.handleError(error);
    }
}

export const getMenuItemsByApplication = async (event) => {
    try {
        const { id } = event.pathParameters;
        return await menuItemsService.getMenuItemsByApplication(id);
    } catch (error) {
        return ResponseHelper.handleError(error);
    }
}

export const createMenuItem = async (event) => {
    try {
        return await menuItemsService.createMenuItem(event);
    } catch (error) {
        return ResponseHelper.handleError(error);
    }
}

export const updateMenuItem = async (event) => {
    try {
        const menuItem = await menuItemsService.updateMenuItem(event);
        return ResponseHelper.success(menuItem);
    } catch (err) {
        return ResponseHelper.handleError(err);
    }
}

export const deleteMenuItem = async (event) => {
    try {
        const { id } = event.pathParameters;
        await menuItemsService.deleteMenuItem(id);
        return ResponseHelper.success({ message: `Menu item with id ${id} deleted` });
    } catch (err) {
        return ResponseHelper.handleError(err);
    }
}