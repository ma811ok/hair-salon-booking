# Hair Salon Booking App - Figma Design System

## Design Tokens

### Colors
```
Primary:      #3B82F6 (Blue-500)
Primary Dark: #2563EB (Blue-600)
Secondary:    #8B5CF6 (Violet-500)
Success:      #10B981 (Green-500)
Warning:      #F59E0B (Amber-500)
Danger:       #EF4444 (Red-500)

Background:   #F3F4F6 (Gray-100)
Surface:      #FFFFFF (White)
Border:       #E5E7EB (Gray-200)
Text Primary: #111827 (Gray-900)
Text Secondary: #6B7280 (Gray-500)
```

### Typography
```
Font Family: Inter, system-ui, sans-serif

H1: 32px / 700 weight / 1.2 line-height
H2: 24px / 600 weight / 1.3 line-height
H3: 20px / 600 weight / 1.4 line-height
Body: 16px / 400 weight / 1.5 line-height
Small: 14px / 400 weight / 1.5 line-height
Caption: 12px / 400 weight / 1.4 line-height
```

### Spacing
```
xs: 4px
sm: 8px
md: 16px
lg: 24px
xl: 32px
2xl: 48px
```

### Border Radius
```
sm: 4px
md: 8px
lg: 12px
xl: 16px
full: 9999px
```

---

## Page Designs

### 1. Login Page
```
┌─────────────────────────────────────────┐
│                                         │
│              [Logo Icon]                │
│           Hair Salon Booking            │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │         登录 / Login            │   │
│  │                                 │   │
│  │  邮箱 / Email                   │   │
│  │  ┌─────────────────────────┐   │   │
│  │  │ user@example.com        │   │   │
│  │  └─────────────────────────┘   │   │
│  │                                 │   │
│  │  密码 / Password                │   │
│  │  ┌─────────────────────────┐   │   │
│  │  │ ••••••••                │   │   │
│  │  └─────────────────────────┘   │   │
│  │                                 │   │
│  │  [✓] 记住我 / Remember me      │   │
│  │                                 │   │
│  │  ┌─────────────────────────┐   │   │
│  │  │      登录 / Login       │   │   │
│  │  └─────────────────────────┘   │   │
│  │                                 │   │
│  │  还没有账号？立即注册           │   │
│  │  No account? Register now →    │   │
│  └─────────────────────────────────┘   │
│                                         │
│           [中文] [EN]                   │
└─────────────────────────────────────────┘
```

**Components:**
- Logo: 64x64px, rounded, gradient background
- Card: White, rounded-xl, shadow-lg, max-w-md
- Input: Gray border, rounded-lg, focus:ring-2 focus:ring-blue-500
- Button: Blue-500, white text, rounded-lg, hover:blue-600
- Language switcher: Text buttons with active state

---

### 2. Register Page
```
┌─────────────────────────────────────────┐
│                                         │
│              [Logo Icon]                │
│           Hair Salon Booking            │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │        注册 / Register          │   │
│  │                                 │   │
│  │  姓名 / Name                    │   │
│  │  ┌─────────────────────────┐   │   │
│  │  │ 请输入姓名                │   │   │
│  │  └─────────────────────────┘   │   │
│  │                                 │   │
│  │  邮箱 / Email                   │   │
│  │  ┌─────────────────────────┐   │   │
│  │  │ user@example.com        │   │   │
│  │  └─────────────────────────┘   │   │
│  │                                 │   │
│  │  电话 / Phone                   │   │
│  │  ┌─────────────────────────┐   │   │
│  │  │ +86 138 0000 0000       │   │   │
│  │  └─────────────────────────┘   │   │
│  │                                 │   │
│  │  密码 / Password                │   │
│  │  ┌─────────────────────────┐   │   │
│  │  │ ••••••••                │   │   │
│  │  └─────────────────────────┘   │   │
│  │                                 │   │
│  │  确认密码 / Confirm Password    │   │
│  │  ┌─────────────────────────┐   │   │
│  │  │ ••••••••                │   │   │
│  │  └─────────────────────────┘   │   │
│  │                                 │   │
│  │  ┌─────────────────────────┐   │   │
│  │  │     注册 / Register     │   │   │
│  │  └─────────────────────────┘   │   │
│  │                                 │   │
│  │  已有账号？立即登录             │   │
│  │  Have account? Login now →     │   │
│  └─────────────────────────────────┘   │
│                                         │
└─────────────────────────────────────────┘
```

---

### 3. Dashboard (Home)
```
┌─────────────────────────────────────────────────────┐
│  [Logo]  Hair Salon        [🏠] [📅] [👤] [🌐] [🚪]│
├─────────────────────────────────────────────────────┤
│                                                     │
│  欢迎回来，张三！Welcome back, Zhang San!            │
│  今天想做什么？What would you like to do today?     │
│                                                     │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐ │
│  │   [📅]      │  │   [✂️]      │  │   [📊]      │ │
│  │  我的预约   │  │  预约服务   │  │  历史记录   │ │
│  │  My Bookings│  │  Book Now   │  │  History    │ │
│  │   3 个待处理 │  │   立即预约  │  │   12 已完成 │ │
│  └─────────────┘  └─────────────┘  └─────────────┘ │
│                                                     │
│  ─────────── 即将开始的预约 Upcoming ───────────    │
│                                                     │
│  ┌─────────────────────────────────────────────┐   │
│  │ [👤] 李发型师      今天 14:00               │   │
│  │      Stylist Li    Today 2:00 PM            │   │
│  │      剪发 + 染发  Haircut + Dye             │   │
│  │      [查看详情] [取消]                      │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
│  ┌─────────────────────────────────────────────┐   │
│  │ [👤] 王造型师      明天 10:00               │   │
│  │      Stylist Wang  Tomorrow 10:00 AM        │   │
│  │      烫发  Perm                             │   │
│  │      [查看详情] [取消]                      │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
└─────────────────────────────────────────────────────┘
```

**Quick Action Cards:**
- Size: ~200px width, white bg, shadow, rounded-xl
- Icon: 48px, colored circle background
- Hover: scale(1.02), shadow increase

---

### 4. Bookings Page
```
┌─────────────────────────────────────────────────────┐
│  [Logo]  Hair Salon        [🏠] [📅] [👤] [🌐] [🚪]│
├─────────────────────────────────────────────────────┤
│                                                     │
│  我的预约  My Bookings                              │
│                                                     │
│  [全部 All] [待处理 Pending] [已确认 Confirmed]     │
│  [已完成 Completed] [已取消 Cancelled]              │
│                                                     │
│  ┌─────────────────────────────────────────────┐   │
│  │ ┌─────┐                                     │   │
│  │ │ 04  │  剪发服务 Haircut Service            │   │
│  │ │ 4月 │  李发型师 Stylist Li                 │   │
│  │ └─────┘  📅 今天 Today  ⏰ 14:00-15:00       │   │
│  │          💰 ¥128                            │   │
│  │          [🟡 待处理 Pending]                 │   │
│  │          [查看详情] [取消预约]               │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
│  ┌─────────────────────────────────────────────┐   │
│  │ ┌─────┐                                     │   │
│  │ │ 05  │  烫发服务 Perm Service               │   │
│  │ │ 4月 │  王造型师 Stylist Wang               │   │
│  │ └─────┘  📅 明天 Tomorrow  ⏰ 10:00-12:00    │   │
│  │          💰 ¥388                            │   │
│  │          [🟢 已确认 Confirmed]               │   │
│  │          [查看详情]                          │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
│  ┌─────────────────────────────────────────────┐   │
│  │ ┌─────┐                                     │   │
│  │ │ 01  │  染发服务 Dye Service                │   │
│  │ │ 4月 │  张总监 Director Zhang               │   │
│  │ └─────┘  📅 2025-04-01                      │   │
│  │          💰 ¥268                            │   │
│  │          [✅ 已完成 Completed]               │   │
│  │          [查看详情] [评价]                   │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
└─────────────────────────────────────────────────────┘
```

**Booking Card:**
- Date badge: 60x60px, blue background, white text
- Status badges: Yellow (pending), Green (confirmed), Gray (completed), Red (cancelled)
- Actions: Outlined buttons, small size

---

### 5. Profile Page
```
┌─────────────────────────────────────────────────────┐
│  [Logo]  Hair Salon        [🏠] [📅] [👤] [🌐] [🚪]│
├─────────────────────────────────────────────────────┤
│                                                     │
│  个人中心  Profile                                  │
│                                                     │
│         ┌─────────┐                                 │
│         │ [👤]    │                                 │
│         │  张三   │                                 │
│         │ Zhang   │                                 │
│         └─────────┘                                 │
│      zhangsan@example.com                           │
│                                                     │
│  ┌─────────────────────────────────────────────┐   │
│  │ 👤 编辑资料  Edit Profile          >        │   │
│  ├─────────────────────────────────────────────┤   │
│  │ 🔒 修改密码  Change Password       >        │   │
│  ├─────────────────────────────────────────────┤   │
│  │ 📅 我的预约  My Bookings           >   (3)  │   │
│  ├─────────────────────────────────────────────┤   │
│  │ 🔔 通知设置  Notifications         >        │   │
│  ├─────────────────────────────────────────────┤   │
│  │ ❓ 帮助中心  Help Center           >        │   │
│  ├─────────────────────────────────────────────┤   │
│  │ 🌐 语言      Language              >  中文  │   │
│  ├─────────────────────────────────────────────┤   │
│  │ 🚪 退出登录  Logout                >        │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
└─────────────────────────────────────────────────────┘
```

**Profile Menu Items:**
- Full width, white bg, hover:gray-50
- Icon + Text + Chevron right
- Divider between items

---

### 6. New Booking Page
```
┌─────────────────────────────────────────────────────┐
│  [Logo]  Hair Salon        [🏠] [📅] [👤] [🌐] [🚪]│
├─────────────────────────────────────────────────────┤
│                                                     │
│  ← 返回 Back        预约服务 Book Service           │
│                                                     │
│  ─────────── 选择发型师 Select Stylist ───────────  │
│                                                     │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐       │
│  │ [👤]   │ │ [👤]   │ │ [👤]   │ │ [👤]   │       │
│  │ 李师傅 │ │ 王师傅 │ │ 张总监 │ │ 陈总监 │       │
│  │ ★4.9   │ │ ★4.8   │ │ ★5.0   │ │ ★4.7   │       │
│  │ ✓选中  │ │        │ │        │ │        │       │
│  └────────┘ └────────┘ └────────┘ └────────┘       │
│                                                     │
│  ─────────── 选择服务 Select Service ───────────    │
│                                                     │
│  ┌─────────────────────────────────────────────┐   │
│  │ ● 剪发  Haircut                    ¥68      │   │
│  │   约30分钟 ~30 min                            │   │
│  └─────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────┐   │
│  │ ○ 染发  Hair Dye                   ¥198     │   │
│  │   约2小时 ~2 hours                            │   │
│  └─────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────┐   │
│  │ ○ 烫发  Perm                       ¥388     │   │
│  │   约3小时 ~3 hours                            │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
│  ─────────── 选择时间 Select Time ───────────       │
│                                                     │
│  ┌─────────────────────────────────────────────┐   │
│  │ 今天 Today  4月4日                            │   │
│  │ [09:00] [10:00] [11:00] [14:00] [15:00]     │   │
│  │ [16:00] [17:00]                               │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
│  ─────────── 备注 Notes ───────────                 │
│                                                     │
│  ┌─────────────────────────────────────────────┐   │
│  │ 请输入特殊要求...                             │   │
│  │ Enter special requests...                     │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
│  ┌─────────────────────────────────────────────┐   │
│  │  合计 Total: ¥68                              │   │
│  │                                               │   │
│  │  [      确认预约 Confirm Booking      ]       │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## Component Library

### Buttons
```
Primary:   bg-blue-500 text-white rounded-lg px-4 py-2
Secondary: bg-white border border-gray-300 rounded-lg px-4 py-2
Danger:    bg-red-500 text-white rounded-lg px-4 py-2
Ghost:     bg-transparent text-gray-600 hover:bg-gray-100
Icon:      w-10 h-10 rounded-full flex items-center justify-center
```

### Inputs
```
Text:      border border-gray-300 rounded-lg px-4 py-2 w-full
Focus:     ring-2 ring-blue-500 border-blue-500
Error:     border-red-500 ring-red-500
Disabled:  bg-gray-100 text-gray-400
```

### Cards
```
Default:   bg-white rounded-xl shadow-md p-6
Hover:     shadow-lg transform scale-[1.02]
Selected:  ring-2 ring-blue-500
```

### Badges
```
Pending:   bg-yellow-100 text-yellow-800 rounded-full px-3 py-1
Confirmed: bg-green-100 text-green-800 rounded-full px-3 py-1
Completed: bg-gray-100 text-gray-800 rounded-full px-3 py-1
Cancelled: bg-red-100 text-red-800 rounded-full px-3 py-1
```

---

## Responsive Breakpoints
```
Mobile:   < 640px  (Single column, stacked layout)
Tablet:   640px - 1024px  (2 columns where applicable)
Desktop:  > 1024px (Full layout, sidebar optional)
```

## Mobile Navigation
```
Bottom nav bar:
┌─────────┬─────────┬─────────┬─────────┐
│   🏠    │   📅    │   ➕    │   👤    │
│  首页   │  预约   │  新建   │  我的   │
│  Home   │Booking  │  New    │ Profile │
└─────────┴─────────┴─────────┴─────────┘
```
