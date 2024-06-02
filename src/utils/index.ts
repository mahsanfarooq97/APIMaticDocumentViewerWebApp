export const exportDocumentation = (documentation: any, callback: any) => {
  const jsonString = JSON.stringify(documentation, null, 2);
  const blob = new Blob([jsonString], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "documentation.json";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  if (typeof callback === "function") callback();
};
