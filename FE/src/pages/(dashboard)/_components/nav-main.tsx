import { ChevronRight } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import { PiChatCentered } from "react-icons/pi";
import { TbFileDescription } from "react-icons/tb";
import { Link, useLocation } from "react-router-dom";

import {
  Book,
  File,
  Grip,
  Image,
  LayoutDashboard,
  LayoutPanelLeft,
  ShoppingCart,
  Sliders,
  Ticket,
  User,
} from "lucide-react";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Thống kê",
      url: "/admin",
      icon: LayoutDashboard,
      isActive: false,
    },
    {
      title: "Sản phẩm",
      url: "#",
      icon: File,
      items: [
        {
          title: "Danh sách",
          url: "/admin/products",
        },
        {
          title: "Thêm sản phẩm",
          url: "/admin/products/add",
        },
      ],
    },
    {
      title: "Danh mục",
      url: "/admin/categories",
      icon: LayoutPanelLeft,
    },
    {
      title: "Thuộc tính",
      url: "/admin/attributes",
      icon: Grip,
    },
    {
      title: "Voucher",
      url: "/admin/voucher",
      icon: Ticket,
    },
    {
      title: "Đơn hàng",
      url: "/admin/orders",
      icon: ShoppingCart,
    },
    {
      title: "Người dùng",
      url: "/admin/users",
      icon: User,
    },
    {
      title: "Bài viết",
      url: "/admin/blogs",
      icon: Book,
    },
    {
      title: "Sliders",
      url: "/admin/sliders",
      icon: Sliders,
    },
    {
      title: "Logos",
      url: "/admin/Logos",
      icon: Image,
    },
    {
      title: "Tin nhắn",
      url: "/admin/message",
      icon: PiChatCentered,
    },
    {
      title: "Đánh giá",
      url: "/admin/testimonial",
      icon: TbFileDescription,
    },
  ],
};

export function NavMain() {
  // State để theo dõi mục đang được chọn

  const location = useLocation();
  const [activeItem, setActiveItem] = useState<string>(location.pathname);
  useEffect(() => {
    setActiveItem(location.pathname);
  }, [location.pathname]);
  const handleMenuItemClick = (url: string) => {
    setActiveItem(url); // Cập nhật mục đang được chọn
  };
  return (
    <SidebarGroup>
      <SidebarMenu>
        {data.navMain.map((item) =>
          item.items ? (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={item.isActive}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    tooltip={item.title}
                    onClick={() => handleMenuItemClick(item.url)} // Cập nhật khi click vào mục
                    className={
                      activeItem === item.url ? "bg-black text-white" : ""
                    }
                  >
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton asChild>
                          <Link to={subItem.url}>
                            <span>{subItem.title}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          ) : (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                onClick={() => handleMenuItemClick(item.url)} // Cập nhật khi click vào mục
                className={activeItem === item.url ? "bg-black text-white" : ""}
              >
                <Link to={item.url}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        )}
      </SidebarMenu>
    </SidebarGroup>
  );
}
