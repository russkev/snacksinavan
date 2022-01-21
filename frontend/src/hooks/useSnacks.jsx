import { useContext, useState, useEffect } from "react";
import { SnackContext } from "../contexts/snack.context";

export const category = {
  drinks: 0,
  food: 1,
};

function isScrolledIntoView(cardElement, containerElement) {
  if (cardElement && containerElement) {
    const containerWidth = containerElement.clientWidth;
    const containerCentre = containerWidth / 2;
    const containerOffset = containerElement.offsetLeft;
    const rectangle = cardElement.getBoundingClientRect();
    return rectangle.left < containerCentre + containerOffset; 
  }
  return false;
}

function scrollToTarget(cardElement, containerElement, offset) {
  if (cardElement && containerElement) {

    const elementPosition = cardElement.offsetLeft;
    const containerOffset = containerElement.offsetLeft;
    containerElement.scrollLeft = elementPosition - containerOffset - offset;
  }
}

function getCategoryCards() {
  const categoryCards = [
    document.getElementById("Cappuccino"),
    document.getElementById("Gingernut Biscuit"),
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

function allowAnimationAfterPageLoad(selector) {
  if (selector) {
    setTimeout(() => {
      const titles = document.getElementsByClassName("category");
      Array.from(titles).forEach((title) => {
        title.style.animationDuration = "0.35s";
      });
      selector.style.animationDuration = "0.35s";
    }, 400);
  }
}

/**
 * Main snacks hook. Provides data manipulation methods for the snacks menu
 */
export default function useSnacks() {
  const { snacks, loading, error } = useContext(SnackContext);
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(category.drinks);
  const [menuContainer, setMenuContainer] = useState(document.getElementById("menu-list-1"));

  useEffect(() => {
    setMenuContainer(document.getElementById("menu-list-1"));
    const selector = document.getElementById("category-selector");

    function handleSelectorMove() {
      const categoryCards = getCategoryCards();
      const containerElement = document.getElementById("menu-list-1");
      if (containerElement && categoryCards[category.food] && selector) {
        if (
          isScrolledIntoView(categoryCards[category.food], containerElement) &&
          selectedCategory !== category.food
        ) {
          setSelectedCategory(category.food);
          moveSelectorTo(selector, category.food);
        } else if (
          !isScrolledIntoView(categoryCards[category.food], containerElement) &&
          selectedCategory !== category.drinks
        ) {
          setSelectedCategory(category.drinks);
          moveSelectorTo(selector, category.drinks);
        }
      }
    }


    allowAnimationAfterPageLoad(selector);
    handleSelectorMove();

    if (menuContainer) {
      menuContainer.addEventListener("scroll", handleSelectorMove);
    }

    return () => {
      if (menuContainer) {
        menuContainer.removeEventListener("scroll", handleSelectorMove);
      }
    };
  }, [loading, selectedCategory, menuContainer]);

  useEffect(() => {
    setMenuContainer(document.getElementById("menu-list-1"));

    function handleWheel(event) {
      if (mouseIsOver) {
        menuContainer.scrollLeft += event.deltaY * 5;
      }
    }

    if (menuContainer) {
      window.addEventListener("wheel", handleWheel);
    }

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [loading, mouseIsOver, menuContainer]);

  function updateCategory(newCategory) {
    const categoryCards = getCategoryCards();
    if (newCategory !== selectedCategory && categoryCards[category.drinks]) {
      if (newCategory === category.food) {
        scrollToTarget(categoryCards[category.food], menuContainer, 20);
      } else {
        scrollToTarget(categoryCards[category.drinks], menuContainer, 20);
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


