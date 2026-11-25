import { describe, it, expect } from 'vitest';
import { getSubdomain, getTargetUrl } from './subdomain';

describe('Subdomain Detection & Routing', () => {
  it('detects maths subdomain when hostname starts with maths.suretysprint.com', () => {
    const loc = {
      hostname: 'maths.suretysprint.com',
      search: '',
      hash: '',
      pathname: '/',
      protocol: 'https:',
      host: 'maths.suretysprint.com',
      port: '',
    };
    expect(getSubdomain(loc)).toBe('maths');
  });

  it('detects main domain on suretysprint.com', () => {
    const loc = {
      hostname: 'suretysprint.com',
      search: '',
      hash: '',
      pathname: '/',
      protocol: 'https:',
      host: 'suretysprint.com',
      port: '',
    };
    expect(getSubdomain(loc)).toBe('main');
  });

  it('detects maths subdomain on maths.localhost', () => {
    const loc = {
      hostname: 'maths.localhost',
      search: '',
      hash: '',
      pathname: '/',
      protocol: 'http:',
      host: 'maths.localhost:5173',
      port: '5173',
    };
    expect(getSubdomain(loc)).toBe('maths');
  });

  it('defaults to main domain on localhost without query params', () => {
    const loc = {
      hostname: 'localhost',
      search: '',
      hash: '',
      pathname: '/',
      protocol: 'http:',
      host: 'localhost:5173',
      port: '5173',
    };
    expect(getSubdomain(loc)).toBe('main');
  });

  it('overrides to maths when ?sub=maths is passed on localhost', () => {
    const loc = {
      hostname: 'localhost',
      search: '?sub=maths',
      hash: '',
      pathname: '/',
      protocol: 'http:',
      host: 'localhost:5173',
      port: '5173',
    };
    expect(getSubdomain(loc)).toBe('maths');
  });

  it('overrides to main when ?sub=main is passed on maths host', () => {
    const loc = {
      hostname: 'maths.suretysprint.com',
      search: '?sub=main',
      hash: '',
      pathname: '/',
      protocol: 'https:',
      host: 'maths.suretysprint.com',
      port: '',
    };
    expect(getSubdomain(loc)).toBe('main');
  });

  it('generates production subdomain url correctly', () => {
    const loc = {
      hostname: 'suretysprint.com',
      search: '',
      hash: '',
      pathname: '/',
      protocol: 'https:',
      host: 'suretysprint.com',
      port: '',
    };
    expect(getTargetUrl('maths', loc)).toBe('https://maths.suretysprint.com/');
    expect(getTargetUrl('main', loc)).toBe('https://suretysprint.com/');
  });

  it('generates local development urls with query param fallback', () => {
    const loc = {
      hostname: 'localhost',
      search: '',
      hash: '',
      pathname: '/',
      protocol: 'http:',
      host: 'localhost:5173',
      port: '5173',
    };
    expect(getTargetUrl('maths', loc)).toBe('http://localhost:5173/?sub=maths');
    expect(getTargetUrl('main', loc)).toBe('http://localhost:5173/?sub=main');
  });
});
