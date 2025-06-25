import {
  Attribute,
  AttributeInArr,
  Data,
  IProduct,
  ProductFormValues,
  Value,
  VariantFormValues,
} from "@/common/types/Product";
import { ProductVariant } from "@/pages/(dashboard)/product/types";
import { ProductItem, Variant } from "@/pages/(website)/shop/types";
import { type ClassValue, clsx } from "clsx";

import { io, Socket } from "socket.io-client";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat("vi-VN").format(value);

export const formatCurrencyVND = (amount: number): string => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};

const URL = import.meta.env.VITE_API_URL_SOCKET;

export const socket: Socket = io(URL, {
  autoConnect: false,
});

// ===================================================================

export function getUniqueTypes(product: IProduct) {
  const types = new Set(); // Sử dụng Set để đảm bảo không có giá trị trùng lặp

  // Duyệt qua tất cả các biến thể (variants) của sản phẩm
  product?.variants?.forEach((variant) => {
    // Duyệt qua tất cả các giá trị (values) trong mỗi biến thể
    variant.values.forEach((value) => {
      types.add(value.type); // Thêm type vào Set
    });
  });

  return Array.from(types); // Chuyển Set về mảng và trả về
}

export function getUniqueTypesFromFields(fields: ProductVariant[]) {
  const types = new Set(); // Sử dụng Set để đảm bảo không có giá trị trùng lặp

  // Duyệt qua tất cả các biến thể (variants) của sản phẩm
  fields.forEach((field) => {
    // Duyệt qua tất cả các giá trị (values) trong mỗi biến thể
    field.values.forEach((value) => {
      types.add(value.type); // Thêm type vào Set
    });
  });

  return Array.from(types); // Chuyển Set về mảng và trả về
}

// Check array equal
// Example: areArraysEqual([1, 2, 3], [2, 1, 3]) => true
export function areArraysEqual(arr1: string[], arr2: string[]): boolean {
  if (arr1.length !== arr2.length) return false;

  return arr1.every((item) => arr2.includes(item));
}

export function getUniqueAttributeValue(product: IProduct): Data[][] {
  return product.variants.reduce<Data[][]>((acc, variant) => {
    // @ts-expect-error: variant.values may not be typed as Value[] but is expected to have compatible structure
    variant.values.forEach((item: Value) => {
      const { type, value } = item;

      // Tìm mảng tương ứng với từng type trong acc
      let existingTypeArray: Data[] | undefined = acc.find(
        (arr) => arr.length > 0 && arr[0].type === type
      );

      if (!existingTypeArray) {
        existingTypeArray = [];
        acc.push(existingTypeArray);
      }

      // Kiểm tra xem giá trị value đã tồn tại trong mảng chưa
      if (
        !existingTypeArray.some((existingItem) => existingItem.value === value)
      ) {
        const revalidateItem = {
          value,
          label: item.name,
          _id: item._id,
          type,
        };
        // @ts-expect-error: revalidateItem is compatible with Data type but may have extra fields
        existingTypeArray.push(revalidateItem);
      }
    });
    return acc;
  }, []);
}

export function getSelectedValues(
  valueAttributeProduct: Data[][],
  attributes: Attribute[]
) {
  return attributes.reduce((acc, attribute) => {
    valueAttributeProduct.filter((item) => {
      if (attribute.name == item[0].type) {
        // @ts-expect-error: acc is an object with dynamic keys based on attribute._id, which may not be typed explicitly
        acc[attribute._id] = item;
      }
    });

    return acc;
  }, {});
}

export const getAttributesUsedInArray = (
  array1: VariantFormValues[],
  attributes: AttributeInArr[]
) => {
  const usedAttributes: VariantFormValues[] = [];

  // Duyệt qua từng item trong array1
  array1.forEach((product) => {
    product.values.forEach((productValue) => {
      // Tìm các attribute trong array2 mà có giá trị trùng với productValue
      attributes.forEach((attribute) => {
        if (
          attribute.values.some(
            (attrValue) => attrValue.value === productValue.value
          )
        ) {
          if (!usedAttributes.find((attr) => attr._id === attribute._id)) {
            usedAttributes.push(attribute);
          }
        }
      });
    });
  });

  return usedAttributes;
};

export function formatDataLikeFields(valeMix: Data[][]) {
  return valeMix.map((group) => ({
    price: 0,
    originalPrice: 0,
    priceSale: 0,
    values: group.map((item) => ({
      _id: item._id,
      name: item.label,
      type: item.type,
      value: item.value,
    })),
    countOnStock: 0,
    image: "",

    // deleted: false,
    // id: crypto.randomUUID(), // Tạo id ngẫu nhiên cho mỗi phần tử
  }));
}

// ====================
interface ValOfMatch {
  _id?: string;
  name?: string;
  value?: string;
  type: string;
  slugName?: string;
}

const isMatch = (values1: ValOfMatch[], values2: ValOfMatch[]) => {
  return values2.every((value2) =>
    values1.some(
      (value1) =>
        value1._id === value2._id &&
        value1.type === value2.type &&
        value1.value === value2.value
    )
  );
};

// Tạo mảng 2 mới bằng cách thay thế các object nếu tìm thấy trùng trong mảng 1
export function updateFields(
  array1: VariantFormValues[],
  array2: VariantFormValues[]
) {
  return array2.map((item2) => {
    const matchingItem = array1.find((item1) =>
      isMatch(item1.values, item2.values)
    );

    // Nếu tìm thấy item trùng trong array1, thay thế, nếu không, giữ nguyên item2
    return matchingItem ? matchingItem : item2;
  });
}

// Check trùng values
export const checkForDuplicateVariants = (data: ProductFormValues) => {
  const variantSet = new Map<string, number>(); // Lưu vị trí của từng variant key
  const duplicateIndices: number[] = []; // Lưu vị trí của các biến thể bị trùng

  data.variants.forEach((variant, index) => {
    // Tạo khóa duy nhất dựa trên các thuộc tính chính
    const variantKey = variant.values
      .map((valueObj) => `${valueObj.type}:${valueObj._id}`)
      .join("|");

    if (variantSet.has(variantKey)) {
      // Nếu trùng, thêm vị trí hiện tại vào duplicateIndices
      duplicateIndices.push(index);
    } else {
      // Nếu không trùng, lưu vị trí hiện tại vào variantSet
      variantSet.set(variantKey, index);
    }
  });

  return duplicateIndices; // Trả về mảng vị trí của các biến thể bị trùng
};

//

export const extractAttributes = (variants: Variant[]) => {
  const tempAttributes: {
    [key: string]: Set<string>;
  } = {};

  variants.forEach((variant) => {
    variant.values.forEach((value) => {
      const type = value.type;
      if (!tempAttributes[type]) {
        tempAttributes[type] = new Set<string>();
      }
      tempAttributes[type].add(`${value._id}:${value.value}`);
    });
  });

  // Chuyển Set → Array để khớp kiểu string[]
  const attributes: {
    [key: string]: string[];
  } = {};

  Object.keys(tempAttributes).forEach((key) => {
    attributes[key] = Array.from(tempAttributes[key]);
  });
  return attributes;
};

export const filterAndFormatAttributes = (
  product: ProductItem,
  type: string,
  value: string
) => {
  const filteredVariants = product.variants.filter((variant) =>
    variant.values.some((attr) => attr.type === type && attr._id === value)
  );

  const result: Record<string, string[]> = {};

  filteredVariants.forEach((variant) => {
    variant.values.forEach((attr) => {
      if (attr.type !== type) {
        if (!result[attr.type]) {
          result[attr.type] = [];
        }
        if (!result[attr.type].includes(attr._id)) {
          result[attr.type].push(attr._id);
        }
      }
    });
  });

  return result;
};

// Format name
export function formatName(input: string) {
  // Hàm loại bỏ dấu tiếng Việt
  const removeDiacritics = (str: string) => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Loại bỏ dấu
      .replace(/đ/g, "d") // Chuyển đổi 'đ' thành 'd'
      .replace(/Đ/g, "D"); // Chuyển đổi 'Đ' thành 'D'
  };

  // Loại bỏ dấu và chuyển về dạng lowercase
  const noDiacritics = removeDiacritics(input.toLowerCase());

  // Tách chuỗi thành các từ
  const words = noDiacritics.split(/\s+/).filter(Boolean); // Loại bỏ khoảng trắng thừa

  // Chuyển thành camelCase
  const camelCase = words
    .map((word, index) =>
      index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join("");

  return camelCase;
}
