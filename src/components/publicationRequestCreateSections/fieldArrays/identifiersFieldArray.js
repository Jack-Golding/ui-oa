import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';

import {
  Button,
  Col,
  IconButton,
  Layout,
  Select,
  TextField,
  Row,
} from '@folio/stripes/components';

const IdentifiersFieldArray = () => {
  const renderIdentifiers = (fields) => {
    return (
      <div>
        {fields.map((identifier, index) => (
          <Row middle="xs" key={identifier}>
            <Col xs={3}>
              <Field
                component={Select}
                label={<FormattedMessage id="ui-oa.identifiers.type" />}
                name={`${identifier}.type`}
              />
            </Col>
            <Col xs={3}>
              <Field
                component={TextField}
                label={<FormattedMessage id="ui-oa.identifiers.identifier" />}
                name={`${identifier}.identifier`}
              />
            </Col>
            <Col xs={6}>
              <IconButton
                icon="trash"
                onClick={() => fields.remove(index)}
              />
            </Col>
          </Row>
        ))}
      </div>
    )
  }

  const renderEmpty = () => {
    return (
      <Layout className="padding-bottom-gutter">
        <FormattedMessage id="ui-oa.identifiers.requestHasNone" />
      </Layout>)
  }

  return (
    <FieldArray name="identifiers">
      {({ fields }) => (
        <div>
          <div>
            {fields.length ? renderIdentifiers(fields) : renderEmpty()}
          </div>
          <Button
            onClick={() => fields.push({})}
          >
            <FormattedMessage id="ui-oa.identifiers.addIdentifier" />
          </Button>
        </div>
      )}
    </FieldArray>)
}

export default IdentifiersFieldArray;