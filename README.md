# 个人所得税查询APP

## 项目信息

- **技术栈**: React 19 + TypeScript + Tailwind CSS + Capacitor + Vite
- **当前源码版本**: v43（最干净的版本）
- **当前APK版本**: v70（工作正常）
- **创建时间**: 2026-05-18

## 项目结构

```
app/
├── src/
│   ├── pages/
│   │   ├── QueryScreen.tsx      # 查询主页（年度选择+查询按钮）
│   │   ├── ResultScreen.tsx     # 列表页（收入明细）
│   │   └── Home.tsx             # 入口页
│   ├── components/
│   │   ├── AppHeader.tsx        # 导航栏
│   │   ├── YearPicker.tsx       # 年份选择器（2019-2026）
│   │   ├── LoadingScreen.tsx    # 加载动画
│   │   ├── AnimatedButton.tsx   # 查询按钮
│   │   └── RadioGroup.tsx       # 所得类型选择
│   ├── data/
│   │   ├── taxData.ts           # 8年税务数据（2019-2026）
│   │   └── mockData.ts          # 年份选项
│   ├── types/
│   │   └── index.ts             # TypeScript类型定义
│   ├── App.tsx                  # 主组件（条件渲染切换页面）
│   ├── main.tsx                 # 入口文件
│   └── index.css                # Tailwind CSS + 全局样式
├── android/                     # Capacitor Android项目
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.js
├── index.html
└── capacitor.config.ts
```

## 核心文件说明

### App.tsx
- 管理两个屏幕状态：`query`（查询页）和 `result`（结果页）
- 管理 `selectedYear` 状态（初始值 `new Date().getFullYear()`）
- 条件渲染切换页面（`? :` 方式）

### QueryScreen.tsx
- 年度选择行（可点击打开年份选择弹窗）
- 所得类型多选（工资薪金、劳务报酬、稿酬、特许权使用费）
- 查询按钮（触发加载动画0.3秒后跳转列表页）

### ResultScreen.tsx
- Summary区域：收入合计、已申报税额合计
- 卡片列表：每张卡片显示工资薪金信息
  - 年月（如 2026-03）
  - 所得项目小类（如 正常工资薪金）
  - 扣缴义务人（如 西安花丛间科技有限公司）
  - 收入（.toFixed(2) 保留2位小数）
  - 已申报税额（.toFixed(2) 保留2位小数）
  - ChevronRight 箭头（灰色 #C7C7C7）
- 卡片之间：13px 灰色间隔
- 底部：14px 灰色间隔

### taxData.ts
8年税务数据（2019-2026），格式：
```typescript
interface TaxYearData {
  所属年份: number;
  收入合计: number;
  已申报税额合计: number;
  收入明细: TaxDetail[];
}

interface TaxDetail {
  年月: string;           // 如 "2026-03"
  所得项目小类: string;    // 如 "正常工资薪金"
  扣缴义务人: string;      // 如 "西安花丛间科技有限公司"
  收入: number;            // 如 28000.00
  已申报税额: number;      // 如 2231.73
}
```

## 构建和打包流程

```bash
# 1. 构建前端
cd /mnt/agents/output/app
npm run build

# 2. 同步到Android
npx cap copy android

# 3. 替换APK中的web assets（JS + CSS + HTML 都要换）
#    注意：不能只替换JS，CSS也必须替换

# 4. zipalign对齐
/tmp/android-sdk/build-tools/35.0.0/zipalign -f -p 4 input.apk output-aligned.apk

# 5. apksigner签名（v1+v2，不要v3）
keytool -genkey -v -keystore ~/.android/debug.keystore -storepass android -alias androiddebugkey -keypass android -keyalg RSA -keysize 2048 -validity 10000 -dname "CN=Android Debug,O=Android,C=US"

/tmp/android-sdk/build-tools/35.0.0/apksigner sign \
  --ks ~/.android/debug.keystore \
  --ks-pass pass:android \
  --key-pass pass:android \
  --v1-signing-enabled true \
  --v2-signing-enabled true \
  --v3-signing-enabled false \
  --in output-aligned.apk \
  --out final.apk
```

## 已知问题（待修复）

### 问题1：列表页箭头右边距太小
- **位置**: `ResultScreen.tsx` 第54行
- **当前代码**:
  ```tsx
  <ChevronRight size={24} style={{ color: '#C7C7C7', flexShrink: 0 }} />
  ```
- **问题**: 箭头紧贴右边边缘，视觉上间距只有2px左右
- **期望效果**: 箭头与右边边缘有约5px间距
- **注意**: 在源码中直接加 `marginRight` 会被tree-shaking优化掉（内联style在production build中可能被移除）。解决方案是在构建产物（dist/assets/index-*.js）中批量替换，或在数据层面处理。

### 问题2：2026年列表页底部灰色空白
- **位置**: `ResultScreen.tsx` 第93-97行
- **当前代码**:
  ```tsx
  {index < yearData.收入明细.length - 1 && (
    <div style={{ height: '13px', backgroundColor: '#F4F6F9' }} />
  )}
  <div style={{ height: '14px', backgroundColor: '#F4F6F9' }} />
  ```
- **问题**: 数据少时（2026年仅3条），滚动容器的 `flex: 1` 撑开，灰色背景暴露，最后一张卡片下方有一大片灰色空白
- **期望效果**: 最后一张卡片与底部之间的灰色间隔 = 卡片之间的灰色间隔（13px）

## 金额显示规则

代码端使用 `.toFixed(2)` 强制保留2位小数：
```tsx
<span>{item.收入.toFixed(2)}元</span>
<span>{item.已申报税额.toFixed(2)}元</span>
<span>{yearData.收入合计.toFixed(2)}元</span>
<span>{yearData.已申报税额合计.toFixed(2)}元</span>
```

## 关键注意事项

1. **不要修改源码中的数据** — 100%原样使用用户提供的JSON
2. **构建产物批量替换** — 样式修改在JS产物中做，不在源码中做（会被tree-shaking优化掉）
3. **CSS必须替换** — 打包APK时要同时替换 JS + CSS + HTML，不能只换JS
4. **签名用v1+v2** — `--v3-signing-enabled false`，v3可能导致安装失败
5. **年份选择器** — 范围2019-2026，初始显示手机当前年份
6. **收入明细顺序** — 按用户提供的数据顺序渲染，不做reverse/sort

## GitHub仓库

https://github.com/haiwei7050/kimi-app
