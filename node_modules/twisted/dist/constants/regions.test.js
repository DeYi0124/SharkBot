"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
describe('Regions', () => {
    describe('regionToRegionGroup', () => {
        it('should match americas', () => {
            expect((0, _1.regionToRegionGroup)(_1.Regions.AMERICA_NORTH)).toEqual(_1.RegionGroups.AMERICAS);
            expect((0, _1.regionToRegionGroup)(_1.Regions.BRAZIL)).toEqual(_1.RegionGroups.AMERICAS);
            expect((0, _1.regionToRegionGroup)(_1.Regions.LAT_NORTH)).toEqual(_1.RegionGroups.AMERICAS);
            expect((0, _1.regionToRegionGroup)(_1.Regions.LAT_SOUTH)).toEqual(_1.RegionGroups.AMERICAS);
        });
        it('should match europe', () => {
            expect((0, _1.regionToRegionGroup)(_1.Regions.EU_EAST)).toEqual(_1.RegionGroups.EUROPE);
            expect((0, _1.regionToRegionGroup)(_1.Regions.EU_WEST)).toEqual(_1.RegionGroups.EUROPE);
            expect((0, _1.regionToRegionGroup)(_1.Regions.TURKEY)).toEqual(_1.RegionGroups.EUROPE);
            expect((0, _1.regionToRegionGroup)(_1.Regions.RUSSIA)).toEqual(_1.RegionGroups.EUROPE);
        });
        it('should match asia', () => {
            expect((0, _1.regionToRegionGroup)(_1.Regions.JAPAN)).toEqual(_1.RegionGroups.ASIA);
            expect((0, _1.regionToRegionGroup)(_1.Regions.KOREA)).toEqual(_1.RegionGroups.ASIA);
        });
        it('should match sea', () => {
            expect((0, _1.regionToRegionGroup)(_1.Regions.OCEANIA)).toEqual(_1.RegionGroups.SEA);
            expect((0, _1.regionToRegionGroup)(_1.Regions.SINGAPORE)).toEqual(_1.RegionGroups.SEA);
            expect((0, _1.regionToRegionGroup)(_1.Regions.TAIWAN)).toEqual(_1.RegionGroups.SEA);
            expect((0, _1.regionToRegionGroup)(_1.Regions.VIETNAM)).toEqual(_1.RegionGroups.SEA);
        });
        it('should throw error when the region does not exists', () => {
            expect(() => (0, _1.regionToRegionGroup)('not a region')).toThrowError();
        });
    });
});
