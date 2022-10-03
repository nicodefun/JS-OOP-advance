

class ProjectItem {
  constructor(id, updatedProjeectFunction) {
    this.id = id;
    this.updatedProjectHandler = updatedProjeectFunction;
    this.connectSwitchBtn();
  }
  connectSwitchBtn() {
    const projectItemElement = document.getElementById(this.id);
    const switchBtn = projectItemElement.querySelector("button:last-of-type");
    switchBtn.addEventListener("click", this.updatedProjectHandler);
  }
}
class ProjectList {
  projects = [];
  constructor(type) {
    this.type = type;
    const projItems = document.querySelectorAll(`#${type}-projects li`);
    for (const projItem of projItems) {
      this.projects.push(new ProjectItem(projItem.id, this.switchProject.bind(this)));
    }
  }

  setSwitchHandlerFunction(switchHandlerFunction) {
    this.switchHandler = switchHandlerFunction;
  }

  addProject() {
    console.log(this);
  }

  switchProject(projectId) {
    this.switchHandler(this.projects.find((p) => p.id === projectId));
    this.projects = this.projects.filter((p) => p.id !== projectId);
  }
}

class App {
  static init() {
    const activeProjectList = new ProjectList("active");
    const finishedProjectList = new ProjectList("finished");

    activeProjectList.setSwitchHandlerFunction(
      finishedProjectList.addProject.bind(finishedProjectList)
    );
    finishedProjectList.setSwitchHandlerFunction(
       activeProjectList.addProject.bind(activeProjectList)
      );
  }
}

App.init();
