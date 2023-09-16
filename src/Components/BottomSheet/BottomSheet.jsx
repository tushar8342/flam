import React, { useState, useEffect } from "react";
import styles from "./BottomSheet.module.css";

function DraggableContainer({
  onClose,
  onDrag,
  headerText,
  content,
  onOpacityChange,
}) {
  const [startY, setStartY] = useState(null);
  const [sheetHeight, setSheetHeight] = useState(350);
  const [contentHeight, setContentHeight] = useState(230);

  const handleMouseMove = (e) => {
    if (startY !== null) {
      const deltaY = e.clientY - startY;
      const newHeight = sheetHeight - deltaY;
      setSheetHeight(newHeight);
      setContentHeight(newHeight > 150 ? newHeight : 230);
      setStartY(e.clientY);
      onDrag(true);
    }
  };

  const handleMouseUp = () => {
    setStartY(null);
    if (sheetHeight > 400) {
      setSheetHeight(600);
      setContentHeight(480);
    } else if (sheetHeight > 150) {
      setSheetHeight(350);
      setContentHeight(230);
    } else {
      setSheetHeight(0);
      setContentHeight(230);
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [startY]);

  useEffect(() => {
    const calculateOpacity = () => {
      const opacity =
        sheetHeight >= 350
          ? 1
          : sheetHeight >= 150
          ? (sheetHeight - 150) / 200
          : 0.1;
      onOpacityChange(opacity);
    };

    calculateOpacity();
  }, [sheetHeight, onOpacityChange]);

  const handleMouseDown = (e) => {
    setStartY(e.clientY);
  };

  return (
    <div
      className={`${styles.draggableContainer}`}
      style={{ height: `${sheetHeight}px` }}
      onMouseDown={handleMouseDown}
      onClick={(e) => e.stopPropagation()}
    >
      <div className={styles.sheetContentContainer}>
        <div className={styles.draggableIcon}></div>
        <div className={styles.header}>{headerText}</div>
        <div
          style={{ height: `${contentHeight}px` }}
          className={styles.sheetContentWrapper}
        >
          <div style={{ paddingLeft: "50px", paddingRight: "50px" }}>
            {content()}
          </div>
        </div>
        <div className={styles.footer}>
          <button onClick={onClose} className={styles.doneButton}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

function BottomSheet({
  onClose = () => {},
  headerText = "Bottom Sheet",
  content = () => <div>There is no content</div>,
}) {
  const [isDragged, setIsDragged] = useState(false);
  const [opacity, setOpacity] = useState(1);

  const handleClick = () => {
    if (!isDragged) {
      onClose();
    }
  };

  const handleOpacityChange = (newOpacity) => {
    setOpacity(newOpacity);
  };

  return (
    <div
      style={{ opacity: opacity }}
      className={`${styles.sheetContainer}`}
      onClick={handleClick}
      onMouseDown={() => setIsDragged(false)}
    >
      <div
        style={{
          position: "relative",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <DraggableContainer
          onOpacityChange={handleOpacityChange}
          onClose={onClose}
          onDrag={(isDragging) => setIsDragged(isDragging)}
          headerText={headerText}
          content={content}
        />
      </div>
    </div>
  );
}

function HomePage() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleOpen = () => {
    setIsSheetOpen(true);
  };

  const handleClose = () => {
    setIsSheetOpen(false);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      setIsSheetOpen((prev) => !prev);
    }
  };

  useEffect(() => {
    document.addEventListener("keypress", handleKeyPress);

    return () => {
      document.removeEventListener("keypress", handleKeyPress);
    };
  }, []);

  return (
    <div>
      <div className={styles.buttonContainer}>
        <div style={{ color: "white", marginRight: "20px", fontSize: '30px' }}>Bottom Sheet</div>
        <button
          className={styles.button}
          onClick={handleOpen}
        >
          Open
        </button>
        {isSheetOpen && (
          <BottomSheet
            onClose={handleClose}
            headerText="Bottom Sheet"
            content={BottomSheetContent}
          />
        )}
      </div>
    </div>
  );
}

function BottomSheetContent() {
  return (
    <div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur accusantium quasi, expedita excepturi aliquid quisquam ducimus iusto? Vel alias facilis provident non dicta inventore quo, accusantium temporibus consequuntur ipsa excepturi! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt, commodi beatae dolores blanditiis nobis consequuntur aspernatur molestiae eligendi eveniet consequatur numquam esse modi corporis deleniti aliquid odit illo ea soluta? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cum distinctio fuga unde! Voluptates, illo velit. Excepturi eius quod eum quidem delectus blanditiis dolorem fugiat rerum, ullam hic exercitationem, deleniti incidunt! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum esse ipsa molestias molestiae aspernatur nostrum voluptas ullam amet. Cumque distinctio saepe repellendus veritatis adipisci, minima impedit at labore laudantium mollitia. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nesciunt temporibus quod sint debitis, vitae necessitatibus nulla cumque aspernatur tenetur tempore voluptate quas fuga repudiandae magnam blanditiis harum mollitia provident? Ad?
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corrupti atque beatae odio nostrum! Laborum nam facilis eius. Saepe non ipsum voluptatum praesentium? Vel accusantium soluta eius nemo dolorem, debitis molestiae. Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus minus totam tenetur mollitia facilis ipsam alias quia cum. Cum recusandae illum accusamus. Quia, magni laudantium sed iure officia neque labore. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi, nesciunt! Eius quos numquam nulla nihil veniam iste mollitia, magnam esse tempore, natus possimus reiciendis! Fugiat iusto autem odit incidunt natus! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate atque inventore distinctio harum qui possimus placeat cum libero odio eaque ipsam voluptatum aspernatur, necessitatibus expedita non illo? Aperiam, odio mollitia!
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, doloremque quaerat sequi aliquam iure magnam soluta? Tempore labore at voluptas quasi vero recusandae ipsa veniam cum? Recusandae natus quasi architecto? Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque molestias debitis, id fuga iure est voluptatibus consequuntur velit sit. Dolorum corrupti doloribus quibusdam nostrum et ipsum, accusantium recusandae quia adipisci! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit in consectetur asperiores nesciunt harum dolorem expedita similique id itaque, dolor odio eligendi sapiente a doloremque recusandae repellat nam ab. Nihil. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias minus voluptate maiores saepe, quod nisi laborum sint ipsum voluptatem accusantium necessitatibus dicta neque doloribus dolorem nobis laboriosam fugit exercitationem officiis!
    </div>
  );
}

export default HomePage;
