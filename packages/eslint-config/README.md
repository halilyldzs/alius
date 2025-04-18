# `@repo/eslint-config`

## ESLint Konfigürasyonu

Bu paket, projemiz için tek bir ESLint yapılandırması içerir. Bu yapılandırma ile JavaScript, TypeScript, React ve Next.js için tüm linting kurallarını tek bir dosyada yönetiyoruz.

### Kod Yazım Kuralları

#### Console.log Kullanımı

- `console.log` kullanımı uyarı verir
- `console.warn`, `console.error` ve `console.info` kullanımına izin verilir

#### TypeScript Kuralları

- Kullanılmayan değişkenler için uyarı verilir
  - Altçizgi (`_`) ile başlayan değişkenler muaftır: `_unused`
- `any` tipinin kullanımı uyarı verir
- Fonksiyon dönüş tiplerinin belirtilmesi gerekir

#### React Kuralları

- React Hook'ların kurallara uygun kullanılması zorunludur
- Dependency array'lerin doğru kullanılması önerilir

### Kullanım

```js
// .eslintrc.js
import { config } from '@repo/eslint-config';

export default config;
```
