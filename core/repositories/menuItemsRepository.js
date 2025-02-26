import { MenuItemModel, ApplicationModel, DynamicRouteModel } from "../models/index.js";

export const getMenuItems = async () => {
    return await MenuItemModel.findAll();
}

export const getMenuItemByApplication = async (applicationId) => {
    return await MenuItemModel.findAll({
        where: { applicationId },
        include: [
            { model: ApplicationModel, as: 'application', attributes: ['name'] },
            { model: DynamicRouteModel, as: 'route', attributes: ['name'] },
            { model: MenuItemModel, as: 'parent', attributes: ['name'] },
            {
                model: MenuItemModel,
                as: 'children',
                attributes: ['id', 'name', 'routeId', 'applicationId', 'parentId', 'icon'],
                include: [
                    { model: DynamicRouteModel, as: 'route', attributes: ['name'] },
                    { model: ApplicationModel, as: 'application', attributes: ['name'] },
                    { model: MenuItemModel, as: 'parent', attributes: ['name'] },
                ]
            }
        ]
    });
}

export const createMenuItem = async (menuItemData) => {
    return await MenuItemModel.create(menuItemData);
}

export const updateMenuItem = async (id, menuItemData) => {
    return await MenuItemModel.update(menuItemData, {
        where: {
            id
        }
    });
}

export const deleteMenuItem = async (id) => {
    return await MenuItemModel.destroy({
        where: {
            id
        }
    });
}

export const findMenuItemById = async (id) => {
    return await MenuItemModel.findByPk(id);
}