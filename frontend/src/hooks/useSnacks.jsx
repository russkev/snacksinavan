import { useContext, useState, useEffect } from "react";
import { SnackContext } from "../contexts/snack.context";
import { useDebounceEffect } from "../hooks/useDebounceEffect";

function isScrolledIntoView(element) {
  const rectangle = element.getBoundingClientRect();
  const elementRight = rectangle.right;

  const isVisible = elementRight <= window.innerWidth;
  return isVisible;
}

function getCategoryCards() {
  const categoryCards = [
    document.getElementById("Cappuccino"),
    document.getElementById("Shortcrust Biscuit"),
  ];
  return categoryCards;
}

function moveSelectorRight(selector) {
  if (selector.classList.contains("category-left")) {
    selector.classList.remove("category-left");
    selector.classList.add("category-right");
  }
}

function moveSelectorLeft(selector) {
  if (selector.classList.contains("category-right")) {
    selector.classList.remove("category-right");
    selector.classList.add("category-left");
  }
}

/**
 * Main snacks hook. Provides data manipulation methods for the snacks menu
 */
export default function useSnacks() {
  const { snacks, loading, error } = useContext(SnackContext);
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [category, setCategory] = useState(0);
  const selector = document.getElementById("category-selector");
  const menuItems = document.getElementById("menu-list-1");

  useEffect(() => {
    if (selector) {
      // selector.style.animationDuration = 0;
      setTimeout(() => {
        selector.style.animationDuration = "0.35s";
      }, 1000)
    }
  }, [selector])

  useEffect(() => {
    if (menuItems) {

      // menuItems.onmouseover = {() => {setMouseIsOver(true)}}
      // menuItems.onmouseout = () => {setMouseIsOver(false)}
      // menuItems.scrollLeft = 0;
    }
  }, [menuItems])

  useDebounceEffect(() => {
      const categoryCards = getCategoryCards();
      if (menuItems && categoryCards[1]) {
        menuItems.addEventListener("scroll", function (e) {
          if (isScrolledIntoView(categoryCards[1]) && category !== 1) {
            setCategory(1);
            moveSelectorRight(selector)
          } else if (!isScrolledIntoView(categoryCards[1]) && category === 1) {
            setCategory(0);
            moveSelectorLeft(selector)
          }
        });
        
      }
  }, 1000);

  useDebounceEffect(() => {
    if (menuItems) {
      window.addEventListener("wheel", function (e) {
        e.deltaY > 0 && mouseIsOver ? (menuItems.scrollLeft += 500) : (menuItems.scrollLeft -= 500);
      });
    }
  }, 100)

  function updateCategory(newCategory) {
    const categoryCards = getCategoryCards();
    if (newCategory !== category && categoryCards[0]) {
      if (newCategory === 1) {
        categoryCards[1].scrollIntoView({ behavior: "smooth", block: "center" });
        // moveSelectorRight(selector)
      } else {
        categoryCards[0].scrollIntoView({ behavior: "smooth", block: "center" });
        // moveSelectorLeft(selector)
      }
      setCategory(newCategory);
    }
  }

  function snackFromId(snackId) {
    return snacks.find((snack) => snack._id === snackId);
  }

  function snackFromName(snackName) {
    return snacks.find((snack) => snack.name === snackName);
  }

  return {
    loading,
    snacks,
    error,
    snackFromId,
    snackFromName,
    updateCategory,
    setMouseIsOver,
  };
}
