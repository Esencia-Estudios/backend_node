import { NotFoundError } from '../helpers/errorHandler.js';
import * as menuItemsRepository from '../repositories/menuItemsRepository.js';

export const validateMenuItem = async (id) => {
    const menuItem = await menuItemsRepository.findMenuItemById(id);
    if (!menuItem) throw new NotFoundError('Menu item with id ' + id + ' not found');
    return true;
};