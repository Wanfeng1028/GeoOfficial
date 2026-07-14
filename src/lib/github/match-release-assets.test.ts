import { describe, expect, it } from 'vitest';
import { platformRules } from '@/data/platforms';
import { matchAssetToPlatform } from './match-release-assets';

const windows = platformRules.find((r) => r.id === 'windows-x64')!;
const linux = platformRules.find((r) => r.id === 'linux-x64')!;
const macArm = platformRules.find((r) => r.id === 'macos-arm64')!;
const macIntel = platformRules.find((r) => r.id === 'macos-x64')!;

describe('matchAssetToPlatform', () => {
  describe('Windows x64', () => {
    it('matches GeoWork-windows-x64.exe', () => {
      expect(matchAssetToPlatform('GeoWork-windows-x64.exe', windows)).toBe(true);
    });
    it('matches GeoWork-windows-x64.msi', () => {
      expect(matchAssetToPlatform('GeoWork-windows-x64.msi', windows)).toBe(true);
    });
    it('does NOT match Linux AppImage despite containing x64', () => {
      expect(matchAssetToPlatform('GeoWork-linux-x64.AppImage', windows)).toBe(false);
    });
    it('does NOT match macOS arm64 dmg', () => {
      expect(matchAssetToPlatform('GeoWork-mac-arm64.dmg', windows)).toBe(false);
    });
  });

  describe('Linux x64', () => {
    it('matches Linux AppImage', () => {
      expect(matchAssetToPlatform('GeoWork-linux-x64.AppImage', linux)).toBe(true);
    });
    it('matches Linux deb', () => {
      expect(matchAssetToPlatform('GeoWork-linux-amd64.deb', linux)).toBe(true);
    });
    it('does NOT match Windows exe', () => {
      expect(matchAssetToPlatform('GeoWork-windows-x64.exe', linux)).toBe(false);
    });
  });

  describe('macOS arm64 (Apple Silicon)', () => {
    it('matches arm64 dmg', () => {
      expect(matchAssetToPlatform('GeoWork-mac-arm64.dmg', macArm)).toBe(true);
    });
    it('does NOT match Intel x64 dmg', () => {
      expect(matchAssetToPlatform('GeoWork-mac-x64.dmg', macArm)).toBe(false);
    });
  });

  describe('macOS x64 (Intel)', () => {
    it('matches Intel x64 dmg', () => {
      expect(matchAssetToPlatform('GeoWork-mac-x64.dmg', macIntel)).toBe(true);
    });
    it('does NOT match arm64 dmg', () => {
      expect(matchAssetToPlatform('GeoWork-mac-arm64.dmg', macIntel)).toBe(false);
    });
  });
});
