import { ProgrammingApi } from './ProgrammingApi';
import ApiUtils from './ApiUtils';

jest.mock('./ApiUtils');

describe('ProgrammingApi', () => {
    describe('getAllPrograms', () => {
        it('should call apiGet with the correct endpoint', () => {
            ProgrammingApi.getAllPrograms();
            expect(ApiUtils.apiGet).toHaveBeenCalledWith('programming/all_programs');
        });
    });

    describe('createProgram', () => {
        it('should call apiPost with the correct endpoint and program data', () => {
            const programData = {
                name: 'Test Program',
                description: 'Test Description'
            };

            ProgrammingApi.createProgram(programData);
            expect(ApiUtils.apiPost).toHaveBeenCalledWith('/programming/program', {
                programName: programData.name,
                description: programData.description
            });
        });
    });
});