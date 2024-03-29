import Template from "./Template";
import TemplateProvider from "./useTemplate";

export default function TemplateConfigContext() {
    return (
        <TemplateProvider>
            <Template />
        </TemplateProvider>
    )
}