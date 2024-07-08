"use strict";
// domain/entities/departmentEntity.ts
Object.defineProperty(exports, "__esModule", { value: true });
function DepartmentEntity(departmentName, isListed = true) {
    return {
        // getId: (): string | undefined => id,
        getDepartmentName: () => departmentName,
        getIsListed: () => isListed
    };
}
exports.default = DepartmentEntity;
