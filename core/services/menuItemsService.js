import * as menuItemsRepository from "../repositories/menuItemsRepository.js";
import { NotFoundError } from "../helpers/errorHandler.js";
import { ResponseHelper } from "../helpers/response.js";
import { validateMenuItemsSchema, validateMenuItemsUpdateSchema } from "../validations/menuItemsValidations.js";
import { validateMenuItem } from "../validators/menuItemsValidators.js";

export const getMenuItems = async () => {
    try {
        const menuItems = await menuItemsRepository.getMenuItems();
        if (!menuItems) throw new NotFoundError("Menu items not found");
        return ResponseHelper.success(menuItems);
    } catch (err) {
        throw err;
    }
}

export const getMenuItemsByApplication = async (applicationId) => {
    try {
        const menuItems = await menuItemsRepository.getMenuItemByApplication(applicationId);
        if (!menuItems) throw new NotFoundError("Menu items not found");

        // Función recursiva para construir la jerarquía de los items
        const formatItemWithChildren = (item, allItems) => {
            const children = allItems.filter(child => child.parentId === item.id);

            const formattedChildren = children.length > 0
                ? children.map(child => formatItemWithChildren(child, allItems))
                : [];

            return {
                id: item.id,
                key: item.id + '-' + item.route?.name,
                label: item.name,
                name: item.name,
                application_name: item.application?.name || null,
                route_name: item.route?.name || null,
                parent_name: item.parent?.name || null,
                icon: item.icon || null,
                required_permission: item.required_permission || null,
                is_parent: item.isParent,
                children: formattedChildren.length > 0 ? formattedChildren : null,
                application: item.applicationId || null,
                route: item.routeId || null,
                parent: item.parentId || null
            };
        };

        // Filtramos los items raíz (sin parentId)
        const rootItems = menuItems.filter(item => !item.parentId);

        // Procesamos los items raíz de manera recursiva
        const formattedMenuItems = rootItems.map(item => formatItemWithChildren(item, menuItems));

        return ResponseHelper.success(formattedMenuItems);
    } catch (err) {
        throw err;
    }
};

export const createMenuItem = async (event) => {
    try {
        const { body } = event;
        const menuItemData = JSON.parse(body);
        await validateMenuItemsSchema(menuItemData);
        const menuItem = await menuItemsRepository.createMenuItem(menuItemData);
        return ResponseHelper.success(menuItem);
    } catch (err) {
        throw err;
    }
}

export const updateMenuItem = async (event) => {
    try {
        const { id } = event.pathParameters;
        const { body } = event;
        const menuItemData = JSON.parse(body);
        await validateMenuItem(id);
        await validateMenuItemsUpdateSchema(menuItemData);
        const menuItem = await menuItemsRepository.updateMenuItem(id, menuItemData);
        return ResponseHelper.success(menuItem);
    } catch (err) {
        throw err;
    }
}

export const deleteMenuItem = async (id) => {
    try {
        await validateMenuItem(id);
        await menuItemsRepository.deleteMenuItem(id);
        return ResponseHelper.success({ message: `Menu item with id ${id} deleted` });
    } catch (err) {
        throw err;
    }
}
