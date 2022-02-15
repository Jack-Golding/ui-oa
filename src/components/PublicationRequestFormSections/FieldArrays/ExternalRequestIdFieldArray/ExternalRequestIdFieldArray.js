import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';

import {
  Button,
  Col,
  IconButton,
  TextField,
  Row,
} from '@folio/stripes/components';

const ExternalRequestIdFieldArray = () => {
  const renderExternalRequestId = (fields) => {
    return (
      <>
        {fields.map((externalRequestId, index) => (
          <div
            key={externalRequestId}
            data-testid={`externalRequestIdFieldArray[${index}]`}
          >
            <Row middle="xs">
              <Col xs={3}>
                <Field
                  autoFocus={!fields.value[index].id}
                  component={TextField}
                  label={
                    <FormattedMessage id="ui-oa.externalRequestId.externalRequestId" />
                  }
                  name={`${externalRequestId}.externalId`}
                />
              </Col>
              <Col xs={9}>
                <IconButton icon="trash" onClick={() => fields.remove(index)} />
              </Col>
            </Row>
          </div>
        ))}
      </>
    );
  };

  const renderEmpty = () => {
    return <div />;
  };

  return (
    <FieldArray name="externalRequestIds">
      {({ fields }) => (
        <>
          <>{fields.length ? renderExternalRequestId(fields) : renderEmpty()}</>
          <Button onClick={() => fields.push({})}>
            <FormattedMessage id="ui-oa.publicationRequest.addExternalRequestId" />
          </Button>
        </>
      )}
    </FieldArray>
  );
};

export default ExternalRequestIdFieldArray;