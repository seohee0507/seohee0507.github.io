---
date: '2026-04-22'
title: 'v0으로 재고관리 MVP 만들어보기'
categories: ['Modern Stack']
summary: 'v0에 Supabase 조합'
thumbnail: './v0-mvp.png'
---

> v0의 환경 구성에 따라 재고관리 서비스 만들기

## 기술 스택
- Next.js
- shadcn/ui (Tailwind CSS)
- Supabase
- Vercel

### 재고 관리 바로가기
- [StockFlow](https://app-stock-lake.vercel.app/)

## v0 결과
![v0 첫 결과](../static/v0-first.png)

- 헤더에 각 메뉴가 보이지만 위 대시보드 페이지 하나만 생성  
  &rightarrow; 사용할 [대시보드/재고/카테고리 설정] 메뉴로 수정 후 직접 페이지 추가
- mock 데이터라 실제 입력, 수정, 삭제할 수 있도록 요청  
  &rightarrow; v0이 Supabase연결 후 CRUD 구현

## v0이 구축한 환경에 추가 작업

### 1. 품목 추가, 품목 수정 팝업은 radix dialog 사용
```tsx:title=modal.tsx
import * as Dialog from '@radix-ui/react-dialog';

<Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
  <Dialog.Portal>
    <Dialog.Overlay />
    <Dialog.Content>
      ...
      <Dialog.Close asChild>
        <Button type="button" variant="outline">
          닫기
        </Button>
      </Dialog.Close>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>
```

### 2. 재고 품목 수정 후 한번에 수정하기
- [...] 버튼 클릭 후 아이템 하나 하나 팝업에서 수정하기보다 한번에 수정하도록 ux 개선  
- 드래그 앤 드롭 후 index를 Supabase와 연결

![v0 ux 수정](../static/v0-ux.png)


### * API 레이어 (Supabase Method Chaining 캡슐화)
```ts:title=lib/api/inventory.ts

export const inventoryApi = {
  async getCategories(): Promise<Category[]> {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) throw new Error(error.message);
    return data as Category[];
  },

  ...

  // in() : 다중 필터 - 반복문 사용하지말고 필터로 한번에 처리
  // upsert() : Update + Insert - id 있는지 확인 후 한번에 Update
  async syncInventoryItems(items: InventoryItem[], idsToDelete: string[]): Promise<void> {
    if (idsToDelete.length > 0) {
      const { error } = await supabase.from('inventory_items').delete().in('id', idsToDelete);

      if (error) throw new Error(error.message);
    }

    if (items.length > 0) {
      const upsertData = items.map((item, index) => ({
        id: item.id,
        category_id: item.category_id,
        name: item.name,
        quantity: item.quantity,
        min_stock: item.min_stock,
        price: item.price,
        sort_order: index,
      }));

      const { error } = await supabase
        .from('inventory_items')
        .upsert(upsertData, { onConflict: 'id' });

      if (error) throw new Error(error.message);
    }
  },
  ...
}
```

## Vercel 배포하기
- Supabase의 Environment Variables 설정
![vercel 배포하기](../static/v0-vercel.png)
