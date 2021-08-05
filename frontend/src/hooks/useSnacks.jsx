import { useContext, useState, useEffect } from "react";
import { SnackContext } from "../contexts/snack.context";

export const category = {
  drinks: 0,
  food: 1,
};

function isScrolledIntoView(element) {
  const container = document.getElementById("menu-list-1");
  if (container) {
    const containerWidth = container.clientWidth;
    const rectangle = element.getBoundingClientRect();
    return rectangle.left < containerWidth;
  }
  return false;
}

function scrollToTarget(element, offset) {
  const elementPosition = element.offsetLeft;
  document.getElementById("menu-list-1").scrollLeft = elementPosition;
}

function getCategoryCards() {
  const categoryCards = [
    document.getElementById("Cappuccino"),
    document.getElementById("Shortcrust Biscuit"),
  ];
  return categoryCards;
}

function moveSelectorTo(selector, target) {
  const titles = document.getElementsByClassName("category");
  Array.from(titles).forEach((title, index) => {
    title.classList.add("inactive");
    if (index === target) {
      title.classList.remove("inactive");
    }
  });
  for (const value of Object.values(category)) {
    selector.classList.remove(`category-${value}`);
  }
  selector.classList.add(`category-${target}`);
}

/**
 * Main snacks hook. Provides data manipulation methods for the snacks menu
 */
export default function useSnacks() {
  const { snacks, loading, error } = useContext(SnackContext);
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(category.drinks);

  useEffect(() => {
    const menuItems = document.getElementById("menu-list-1");
    const selector = document.getElementById("category-selector");

    function handleSelectorMove() {
      const categoryCards = getCategoryCards();
      // console.log(selectedCategory)
      if (menuItems && categoryCards[category.food] && selector) {
        if (
          isScrolledIntoView(categoryCards[category.food]) &&
          selectedCategory !== category.food
        ) {
          setSelectedCategory(category.food);
          moveSelectorTo(selector, category.food);
        } else if (
          !isScrolledIntoView(categoryCards[category.food]) &&
          selectedCategory !== category.drinks
        ) {
          setSelectedCategory(category.drinks);
          moveSelectorTo(selector, category.drinks);
        }
      }
    }

    if (selector) {
      setTimeout(() => {
        const titles = document.getElementsByClassName("category");
        Array.from(titles).forEach((title) => {
          title.style.animationDuration = "0.35s";
        });
        selector.style.animationDuration = "0.35s";
      }, 400);
    }
    handleSelectorMove();

    if (menuItems) {
      menuItems.addEventListener("scroll", handleSelectorMove);
    }

    return () => {
      if (menuItems) {
        menuItems.removeEventListener("scroll", handleSelectorMove);
      }
    };
  }, [loading, selectedCategory]);

  useEffect(() => {
    const menuItems = document.getElementById("menu-list-1");

    function handleWheel(event) {
      if (mouseIsOver) {
        menuItems.scrollLeft += event.deltaY * 5;
      }
    }

    if (menuItems) {
      window.addEventListener("wheel", handleWheel);
    }

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [loading, mouseIsOver]);

  function updateCategory(newCategory) {
    const categoryCards = getCategoryCards();
    if (newCategory !== selectedCategory && categoryCards[category.drinks]) {
      if (newCategory === category.food) {
        scrollToTarget(categoryCards[category.food], 50);
      } else {
        scrollToTarget(categoryCards[category.drinks], 50);
      }
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
